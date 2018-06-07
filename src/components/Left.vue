<template>
  <!-- <el-container style="height: 500px; border: 1px solid #eee"> -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']" :default-active='activeIndex' router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>分区域雷达图</template>
        <el-menu-item-group>
          <!-- <template slot="title">分区域雷达图</template> -->
          <el-menu-item index="/index">echarts</el-menu-item>
          <el-menu-item index="/second">d3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
<!-- </el-container> -->
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: this.$route.path,
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="less" scoped>
  //  .el-aside {
  //   color: #333;
  // }
</style>
