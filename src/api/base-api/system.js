import BaseAPI from './base-api.js'

export default class SystemAPI extends BaseAPI {
  constructor(arg) {
    super(arg);
    this.pathURL = '/system';
  }
}