<template>
    <div class="OrderList">
        <div class='order'>
            <div>订单管理</div><br/>
        </div>
        <!-- <el-form :inline="true" :model="tableData" class="demo-form-inline"> -->
        <div class="searchStyle">
            <div class="search_code">
                <span>订单编号:</span>
                <el-input placeholder="请输入内容" v-model="orderId" clearable></el-input>
            </div>
            <div class="search_code">
                <span>会员名称:</span>
                <el-input placeholder="请输入内容" v-model="userName" clearable></el-input>
            </div>
            <div class="search_code">
                <span>下单时间:</span>
                <el-date-picker v-model="createTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
            <div class="search_code">
                <span>订单状态:</span>
                <el-input placeholder="请输入内容" v-model="orderStatus" clearable></el-input>
            </div>
            <div class="search_code">
                <span>商品名称:</span>
                <el-input placeholder="请输入内容" v-model="goodsName" clearable></el-input>
            </div>
        </div>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!-- </el-form> -->
        <!-- 列表 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="订单编号" width="150"></el-table-column>
            <el-table-column prop="orderUserName" label="会员姓名" width="150"></el-table-column>
            <el-table-column prop="orderDetailList" label="商品" width="150" tag="img">

                <!-- <template slot-scope="scope">
                    <img v-for="item in scope.row.orderDetailList" :src="item" alt="" />
                </template> -->
            </el-table-column>
            <el-table-column prop="orderAmount" label="订单金额" width="150"></el-table-column>
            <el-table-column prop="orderAmount" label="实付金额" width="150"></el-table-column>
            <el-table-column prop="purchasingBillPayKind" label="支付方式" width="150"></el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" width="150"></el-table-column>
            <el-table-column prop="createTime" label="下单时间" width="155">
                <template slot-scope="scope">

                    <div>{{scope.row.createTime | formatDate}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <router-link :to="{path:'/orderDetails',query:{id:scope.row.id}}">
                        <el-button type="text" size="small">查看</el-button>
                    </router-link>

                    <el-button @click="deliverGoods(scope.row)" type="text" size="small">发货</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import "./css/orderListStyle.css";
export default {
  name: "orderList",
  data() {
    return {
      //搜索条件
      orderId: "",
      userName: "",
      goodsName: "",
      orderStatus: "",
      startTime: "",
      endTime: "",

      input10: "",
      //下单时间
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value6: "",
      value7: "",
      //列表
      tableData: [
        // {
        //   id: "",                  // 订单编号
        //   orderUserName: "",          // 会员姓名
        //   goods: "",                    //商品
        //   orderAmount: "",            //订单金额
        //   orderAmount: "",               //实付订单
        //   purchasingBillPayKind: "", //支付方式
        //   orderStatus: "",              //订单状态
        //   createTime: ""                //下单时间
        // }
      ]
    };
  },
  methods: {
    //查询
    onSubmit() {
      console.log(this.orderId);
      let data = this.qs.stringify({
        saleCompanyId: 1,
        orderId: this.orderId
        // userName:this.userName,
        // goodsName:this.goodsName,
        // orderStatus:this.orderStatus,
        // startTime:this.startTime,
        // endTime:this.endTime
      });
      this.axios.post(this.url.goods.searchOrder, data).then(res => {
        console.log(res);
        this.tableData = res.data.rows;
        for (let i = 0; i < this.tableData.length; i++) {
          // console.log(this.tableData[i])
          for (let j = 0; j < this.tableData[i].orderDetailList.length; j++) {
            let mainImagePath = this.tableData[i].orderDetailList[j]
              .supplierGoodsSolrVO.mainImagePath;
            this.tableData[i].orderDetailList[j] =
              "http://file.sjgtw.com" + mainImagePath;
            if (this.tableData[i].purchasingBillPayKind == null) {
              this.tableData[i].purchasingBillPayKind = "微信支付";
            } else {
              this.tableData[i].purchasingBillPayKind = this.tableData[i].purchasingBillPayKind;
            }
            if (this.tableData[i].orderStatus == "TO_BE_PAID") {
              this.tableData[i].orderStatus = "待支付";
            } else if (this.tableData[i].orderStatus == "ALREADY_PAID") {
              this.tableData[i].orderStatus = "已支付";
            } else if (this.tableData[i].orderStatus == "PENDING_DELIVERY") {
              this.tableData[i].orderStatus = "待发货";
            } else if (this.tableData[i].orderStatus == "RECEVIED_DELIVERY") {
              this.tableData[i].orderStatus = "待收货";
            } else if (this.tableData[i].orderStatus == "ALREADY_DELIVERY") {
              this.tableData[i].orderStatus = "已发货";
            } else if (
              this.tableData[i].orderStatus == "CONFIRMATION_DELIVERY"
            ) {
              this.tableData[i].orderStatus = "确认收货";
            } else if (this.tableData[i].orderStatus == "ORDER_OVER") {
              this.tableData[i].orderStatus = "订单完成";
            }
          }
        }
      });
    },
    getData() {
      let data = this.qs.stringify({
        supId: 2
      });
      this.axios.post(this.url.goods.orderList, data).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        // console.log(this.tableData)
        for (let i = 0; i < this.tableData.length; i++) {
          // console.log(this.tableData[i])
          for (let j = 0; j < this.tableData[i].orderDetailList.length; j++) {
            let mainImagePath = this.tableData[i].orderDetailList[j]
              .supplierGoodsSolrVO.mainImagePath;
            this.tableData[i].orderDetailList[j] =
              "http://file.sjgtw.com" + mainImagePath;
            if (this.tableData[i].purchasingBillPayKind == null) {
              this.tableData[i].purchasingBillPayKind = "微信支付";
            } else {
              this.tableData[i].purchasingBillPayKind = this.tableData[i].purchasingBillPayKind;
            }
            if (this.tableData[i].orderStatus == "TO_BE_PAID") {
              this.tableData[i].orderStatus = "待支付";
            } else if (this.tableData[i].orderStatus == "ALREADY_PAID") {
              this.tableData[i].orderStatus = "已支付";
            } else if (this.tableData[i].orderStatus == "PENDING_DELIVERY") {
              this.tableData[i].orderStatus = "待发货";
            } else if (this.tableData[i].orderStatus == "RECEVIED_DELIVERY") {
              this.tableData[i].orderStatus = "待收货";
            } else if (this.tableData[i].orderStatus == "ALREADY_DELIVERY") {
              this.tableData[i].orderStatus = "已发货";
            } else if (
              this.tableData[i].orderStatus == "CONFIRMATION_DELIVERY"
            ) {
              this.tableData[i].orderStatus = "确认收货";
            } else if (this.tableData[i].orderStatus == "ORDER_OVER") {
              this.tableData[i].orderStatus = "订单完成";
            }
          }
        }

        console.log(this.tableData);
      });
    },
    deliverGoods(e) {
      console.log(e.id);
      if (e.orderStatus == "已支付") {
        let datalist = this.qs.stringify({
          orderId: e.id
        });
        this.axios.post(this.url.goods.deliverGoods, datalist).then(res => {
          console.log(res);
          this.getData();
        });
      } else {
        this.open(e.orderStatus);
      }
    },
    open(orderStatus) {
      this.$alert("该订单" + orderStatus, "消息提示", {
        confirmButtonText: "确定"
      });
    }
  },
  created() {
    this.getData();
  },
  // 时间转换
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  }
};
</script>

<style scoped>
</style>
