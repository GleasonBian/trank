// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import _url from './requestURL'
import qs from 'qs'
Vue.prototype.qs = qs;
Vue.prototype.url = _url;
Vue.prototype.axios = axios;
Vue.use(VueAxios,axios);
Vue.config.productionTip = false
Vue.use(elementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
