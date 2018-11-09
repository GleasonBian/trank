import Vue from 'vue'
import Router from 'vue-router'

// 商家基本信息 查看 和 编辑 
const editorStoreInfo = resolve => require(['@/components/BusinessShop/editorStoreInfo'], resolve) // 编辑信息
const viewStoreInfo = resolve => require(['@/components/BusinessShop/viewStoreInfo'], resolve) // 查看信息

// 订单列表 和 详情 --- 卖家
const orderList = resolve => require(['@/components/OrderMange/orderList'], resolve) // 列表
const orderDetails = resolve => require(['@/components/OrderMange/orderDetails'], resolve) // 详情

// 商品维护 --- 商家 
const atSalesGoods = resolve => require(['@/components/goodsMaintain/atSalesGoods'], resolve) // 在售商品
const goodsPreview = resolve => require(['@/components/goodsMaintain/goodsPreview'], resolve) // 商品预览
const waitSalesGoods = resolve => require(['@/components/goodsMaintain/waitSalesGoods'], resolve) // 待售商品

// 发布商品 --- 商家
const goodsRelease = resolve => require(['@/components/goodsMaintain/goodsRelease/goodsRelease'], resolve) // 商品发布
const editorInfo = resolve => require(['@/components/goodsMaintain/goodsRelease/editorInfo'], resolve) // 编辑信息
const editorModel = resolve => require(['@/components/goodsMaintain/goodsRelease/editorModel'], resolve) // 编辑型号
const editorDetails = resolve => require(['@/components/goodsMaintain/goodsRelease/editorDetails'], resolve) // 编辑详情

// login 登录
const login = resolve => require(['@/components/login'], resolve);

// 侧边栏
const sidebar = resolve => require(['@/components/sidebar'], resolve)

// 头部
const header = resolve =>require(['@/components/header'],resolve);

//index 主页面
const index = resolve => require(['@/components/index'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path:'/index',
    component:index,
    children:[
      /* 店铺资料 */ 
      {
        path:'viewStoreInfo', // 查看信息
        component:viewStoreInfo
      },{
        path:'editorStoreInfo', //编辑信息
        component:editorStoreInfo, 
      },{
        path:'storeDecorate', //店铺装修
        component: ''         // 二期 暂时 没有对应组件
      },
      /* 商品维护 */
      {
        path:'goodsRelease',  // 商品发布
        component:goodsRelease,
        children: [
          {
            path: 'editorInfo', // 商家发布  --> 编辑信息
            component: editorInfo
          },{
            path: 'editorModel', // 商家发布  --> 编辑型号
            component: editorModel
          },{
            path: 'editorDetails', // 商家发布  --> 编辑详情
            component: editorDetails
          }
        ]
      },{
        path:'atSalesGoods',   // 在售商品
        component:atSalesGoods,
        children:[
          {
            path: 'goodsPreview', // 商品预览
            component: goodsPreview
          }
        ]
      },{
        path:'waitSalesGoods', // 待售商品
        component: waitSalesGoods
      },{
        path:'storeClass',     // 店铺分类
        component: ''          // 暂时没有对应组件
      },
      /* 订单管理 */
      {
        path:'orderList',      // 订单管理
        component: orderList,
        children:[{
          path:"orderDetails",  // 订单详情
          component: orderDetails
        }]
      },{
        path: 'orderAfterSales', // 售后订单,
        component: ' '           // 没有对应组件
      },
      /* 结算管理 */
      {
        path: 'settlementManage', // 结算管理
        component : ''            // 没有对应组件
      }
    ]
  }]
})
// 路由 守卫
//vueRouter.beforeEach(function (to, from, next) {
// const nextRoute = [ 'editorStoreInfo', 'viewStoreInfo', 'orderList'];
// const auth = store.state.auth;
// //跳转至上述3个页面
// if (nextRoute.indexOf(to.name) >= 0) {
//     //未登录
//     if (!store.state.auth.IsLogin) {
//         vueRouter.push({name: 'login'})
//     }
// }
// //已登录的情况再去登录页，跳转至首页
// if (to.name === 'login') {
//     if (auth.IsLogin) {
//         vueRouter.push({name: 'home'});
//     }
// }
// next();
//});
