import FaultCodeAPI from '@/api/code-api/faultCode.js';

export default {
  data() {
    return {
      FaultCodeAPI: new FaultCodeAPI(),
    }
  },
  methods: {
    async $getCodeList(info, alerted = true) {
      const [err, res] = await this.FaultCodeAPI.post("/selectDetailsByCondition", info);
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