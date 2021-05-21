import BaseAPI from './base-api.js'

export default class TruckAPI extends BaseAPI {
  constructor(arg) {
    super(arg);
    this.pathURL = '/truck';
  }
}