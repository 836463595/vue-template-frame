import truckAPI from '@/api/base-api/truck.js';

export default {
  data() {
    return {
      truckAPI: new truckAPI(),
    }
  },
  methods: {
    async $getTruckList(info, alerted = true) {
      const [err, res] = await this.truckAPI.post("/getTruckList", info);
      if (err && alerted == true) {
        this.$message({
          message: err.message,
          type: 'error',
        })
        return null;
      }
      return res;
    },
    // 查看车辆详情
    async $clickTruck(info, alerted = true) {
      const [err, res] = await this.truckAPI.post("/clickTruck?truckId=" + info);
      if (err && alerted == true) {
        this.$message({
          message: err.message,
          type: 'error',
        })
        return null;
      }
      return res;
    },
  }
}