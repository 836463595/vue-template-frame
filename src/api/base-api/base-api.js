import Request from '@/axios/baseAxios.js';
export default class BaseAPI {

  // 网络调用
  get(path, params = {}) {
    for (const key of Object.keys(params)) {
      params[key] = encodeURI(params[key]);
    }
    let instance = Request({
      url: this.pathURL + path,
      method: 'get',
      params: params,
    });
    return instance.then(result => [null, result]).catch(error => [error]);
  }



  post(path, payload = {}) {
    let instance = Request({
      url: this.pathURL + path,
      method: 'post',
      data: payload
    });
    return instance.then(result => [null, result]).catch(error => [error]);
  }
}

