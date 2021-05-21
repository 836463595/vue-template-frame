import BaseAPI from './base-api.js'

export default class FaultCodeAPI extends BaseAPI {
  constructor(arg) {
    super(arg);
    this.pathURL = '/faultCode';
  }
}