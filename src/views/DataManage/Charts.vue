<template>
  <div class="charts">
    <el-tabs type="border-card" v-model="tabPosition">
      <el-tab-pane label="折线图" name="line">
        <echarts :chartData="chartData" :chartType="line"></echarts>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">
        <echarts :chartData="chartData" :chartType="bar"></echarts>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="pie">
        <echarts :chartData="chartData" :chartType="pie"></echarts>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import echarts from "../../components/Echarts";
export default {
  name: "Charts",
  data() {
    return {
      tabPosition: "line",
      chartData: {
        xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yAxisData: [820, 932, 901, 934, 1290, 1330, 1320]
      },
      // chartData: {},
      line: "line",
      bar: "bar",
      pie: "pie"
    };
  },
  components: {
    echarts
  },
  created() {
    // this.getEchartsData();
  },
  methods: {
    // getEchartsData() {
    //   // 异步加载数据
    //   this.$axios.get("/js/chartData.json").then(res => {
    //     this.chartData = res.data;
    //   });
    // }
  }
};
</script>
