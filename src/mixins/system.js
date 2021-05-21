import systemAPI from '@/api/base-api/system.js';

export default {
  data() {
    return {
      systemAPI: new systemAPI(),
    }
  },
  methods: {
    // 获取专家列表
    async $getExperts(alerted = true) {
      const [err, res] = await this.systemAPI.get("/getExperts");
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