<template>
  <el-menu
    default-active="2"
    :router="true">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>商家信息</span>
      </template>
      <el-menu-item index="/index/editorStoreInfo">选项1</el-menu-item>
      <el-menu-item index="/index/viewStoreInfo">选项2</el-menu-item>
    </el-submenu>
  </el-menu>

  <!-- <router-link to="/index/editorStoreInfo">editorStoreInfo</router-link>
  <router-link to="/index/viewStoreInfo">viewStoreInfo</router-link> -->

</template>
<script>
  export default {
    name: "sildbar",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
<style scoped>
</style>