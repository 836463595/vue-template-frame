import Request from '@/axios/codeAxios.js';
export default class BaseAPI {

  /**
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
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