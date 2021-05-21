import axios from 'axios'
import qs from "qs";
import {
  Message
} from 'element-ui'

import {
  getUrl
} from '@/config/env.js'

import {
  getToken,
  removeToken
} from '@/utils/auth'

import router from "../router";



// 创建axios实例
const instance = axios.create({
  baseURL: getUrl()[1],
  timeout: 60000,
});


//网络状态是否异常
var netWorkError = false



// 请求拦截处理
instance.interceptors.request.use(
  config => {

    // 在发送请求之前做处理  设置请求头中Token / Cid  / Content-Type 等等其他自定义信息
    config.headers['Cid'] = '11111111'
    config.headers['Authorization'] = getToken() || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSX0lORk9fS0VZIjoie1wiY2lkXCI6XCJudWxsXCIsXCJpZFwiOjQ2MjQsXCJtb2JpbGVcIjpcIjE3Nzg0Mzc0ODYxXCIsXCJ0aW1lc3RhbXBcIjoxNjA5OTg5OTc0Njc3fSIsImV4cCI6MTYxMjU4MTk3NH0.Ct6v5CjJtHbsqiCQ0MSRPGEuJbgD1qJ42iupaa_NRX0'
    config.headers["Content-Type"] = config.method === "get" ? "application/x-www-form-urlencoded;charset=UTF-8" : "application/json;charset=UTF-8"

    // 如若要对请求参数系列化处理 则使用qs插件 自定义安装
    // if (config.method === "post") {
    //   config.data = JSON.stringify(config.data);
    // }
    // if (config.method === "get") {
    //   config.data = qs.stringify(config.data);
    // }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)


// 响应拦截处理
instance.interceptors.response.use(
  response => {
    return new Promise(function (resolve, reject) {
      responseProcess(response, resolve, reject);
    });
  },
  error => {
    return new Promise(function (resolve, reject) {
      const errorResponse = error.response
      if (errorResponse) {
        errorProcess(errorResponse, reject);
      } else {
        // 网络连接失败  -  只处理一次，其他域中可不做二次处理
        if (!navigator.onLine) {
          if (!netWorkError) {
            netWorkError = true
            setTimeout(() => {
              netWorkError = false
            }, 1000)
            return Message({
              type: 'error',
              message: '网络连接失败',
              duration: 10000
            })
          }
          return
        } else {
          return Message({
            type: 'error',
            message: error
          })
        }
      }
    });
  }
)





/**
 * 
 * @responseProcess 响应拦截处理过程 
 * @CODE_MAP    公司业务指令,根据自己公司业务需要来自定义补充
 * @resData     自定义封装业务数据，前端统一处理data/list数据为data，此操作根据个人公司业务需求做相应的改动，可不做处理
 */

const CODE_MAP = {
  SUCCESS: "SYS.SUCCESS",
  UNKNOWN: 'SYS.UNKNOWN_EXCEPTION',
  BUSSINESS: 'BIZ.BUSSINESS_EXCEPTION'
}
const responseProcess = (response, resolve, reject) => {
  const data = response.data
  const code = data.code
  const resData = {
    code: code,
    data: [],
    totalCount: 0,
    message: null
  }
  switch (code) {
    case CODE_MAP['SUCCESS']:
      if (data.totalCount != null && data.totalCount != 'null') {
        resData.data = data.list,
          resData.totalCount = data.totalCount
      } else {
        resData.data = data.data
      }
      resData.message = data.msg
      resolve(resData);
      break;
    case CODE_MAP['UNKNOWN']:
      resData.message = '未知异常'
      reject(resData);
      break;
    case CODE_MAP['BUSSINESS']:
      resData.message = '业务异常'
      reject(resData);
      break;
    default:
      resData.message = '服务异常'
      reject(resData);
      break;
  }
}



/**
 * 
 * @errorProcess 响应拦截错误处理过程
 * @STATUS_CODE  网络请求状态码 - 可补充
 * @Param message 状态码返回信息
 * @Param process 状态码操作函数
 *
 */
const STATUS_CODE = {
  400: {
    message: "请求参数异常"
  },
  401: {
    message: "用户信息失效, 请重新登录",
    process: () => {
      removeToken();
      router.replace('/');
    }
  },
  403: {
    message: "拒绝访问"
  },
  404: {
    message: "请求地址出错"
  },
  405: {
    message: "不支持此方法"
  },
  408: {
    message: "请求超时"
  },
  500: {
    message: "服务器内部错误"
  },
  501: {
    message: "服务未实现"
  },
  502: {
    message: "网关错误"
  },
  503: {
    message: "服务不可用"
  },
  504: {
    message: "网关超时"
  },
  505: {
    message: "HTTP版本不受支持"
  },
  default: {
    message: "系统未知错误,请反馈给管理员"
  }
}
const errorProcess = (response, reject) => {
  let message = response.data.message || response.data.msg || STATUS_CODE[response.status].message || STATUS_CODE['default'].message;

  // 如果该状态码存在操作函数，则需相应处理
  if (STATUS_CODE[response.status]) {
    if (STATUS_CODE[response.status].process) {
      STATUS_CODE[response.status].process(response.data);
    }
  }
  reject({
    message: ((response.status + ' - ') || '') + message,
    data: response.data || {}
  });
};


export default instance