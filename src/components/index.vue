<template>
<el-container>
  <el-aside width="200px">
    <VSidebar/>
  </el-aside>
  <el-main>
    
    <router-view />
    <router-view name="editor"/>
  </el-main>
</el-container>

</template>

<script>
import VSidebar from '@/components/sidebar';

  export default {
    data(){
      return {
        active: 'viewStoreInfo'
      }
    },
    components:{
      VSidebar
    },
    watch:{
    }
  }

</script>

<style scoped>

</style>
