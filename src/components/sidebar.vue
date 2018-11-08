<template>
<el-row class="tac">
  <el-col :span="12">
    <h3>商家后台</h3>
  </el-col>
</el-row>
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

