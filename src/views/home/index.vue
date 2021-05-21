<template>
  <div class="home-container">
    <el-row style="padding:10px 10px ;margin-bottom:32px;background-color:#fff;border-radius:8px">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="8" :lg="8">
        <div class="chart-wrapper" style="background-color:#67a7a7">4</div>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8">
        <div class="chart-wrapper" style="background-color:#9a4">
          5
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8">
        <div class="chart-wrapper" style="background-color:#fada">
          6
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
}
export default {
  name: 'Home',
  components: {
    LineChart,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
    }
  },
  methods: {},
}
</script>

<style scoped lang="scss" scoped>
.home-container {
  padding: 10px;
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 10px 10px;
    margin-bottom: 32px;
  }
}
</style>
