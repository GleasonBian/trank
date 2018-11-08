'use strict'
/* author: Gleason / LiuShiHao
 * api 接口配置类
 * 使用方法:
 * import api from 'api'
 * api.Api.delMiddleTable
 * 命名参数说明：
 * 列表  listMiddleTable
 * 查询  searchMiddleTable
 * 增加  addMiddleTable
 * 删除  delMiddleTable
 * 编辑  editMiddleTable
 * 设置  setMiddleTable
 * 获取  getMiddleTable
 * ImagePre 接口配置类
 * */

const adminApi = '/adminApi/admin'
const supplierApi ='/api' 
const baseApiGoods = '/adminApi/goods'
const imgApi = '图片地址';
export default {
  common: {
    uploadImage: supplierApi + '/relatedFile/documentUpload' // 上传图片
  },
  login: {
    checkOriginalPassword: adminApi + '/user/checkOriginalPassword', // 校验原密码是否正确
    modifyUserPassword: adminApi + '/user/modifyUserPassword', // 修改用户密码
    ajaxLoginCheck: adminApi + '/ajaxLoginCheck', // 登录
    getCurrentUser: adminApi + '/user/getCurrentUser', // 获取用户信息
    getUserPermission: adminApi + '/user/getUserPermission', // 用户权限
    getSystem: adminApi + '/user/getSystem', // 顶部公用菜单
    logout: adminApi + '/logout' // 退出登录
  },
  goods: {
    thirdBaseClassJSONData: baseApiGoods + '/baseClass/thirdBaseClassJSONData', // 三级类目列表
    baseClassAttrJSONData: baseApiGoods + '/baseClass/baseClassAttrJSONData', // 类目列表
    brandListJSONData: baseApiGoods + '/brand/brandListJSONData', // 品牌列表
    findAreas: baseApiGoods + '/area/findAreas', // 地区名称搜索
    saveAreasList: baseApiGoods + '/baseAreaRelation/saveAreasList', // 地区名称搜索
    listData: supplierApi + '/wxsupplier/supplierProduct/listData', // 分页查询商品信息
    getSupplierProductById: supplierApi + '/wxsupplier/supplierProduct/getSupplierProductById', // 供应商商品详情
    putawayOrSoldOut: supplierApi + '/wxsupplier/supplierProduct/putawayOrSoldOut', // 上架或者下架
    deletes: supplierApi + '/wxsupplier/supplierProduct/deletes', // 批量删除
    orderList: supplierApi + '/wxmall/gtOrder/getOrderBySupId', // 根据商家id获取订单
    deliverGoods: supplierApi + '/wxmall/gtOrder/deliverGoods', // 发货
    searchOrder: supplierApi +'/wxmall/gtOrder/searchOrder' // 搜索
    
  },
  material: {
    getProduct: supplierApi + '/material/product/getProduct', // 获取商品编辑信息
    listData: supplierApi + '/material/product/listData', // 发布新商品=>分页查询商品信息
    
  }
}
