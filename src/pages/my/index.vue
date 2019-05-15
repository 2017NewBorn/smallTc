<template>
  <div class="index">
     <div class="header">
          <div class="userImg">
               <img :src="userInfo.avatarUrl" alt="">
          </div>
          <div class="userInfo">
               <p>{{userInfo.nickName}}</p>
               <p>用户ID</p>
          </div>
          <div class="icW">
            <div class="icon"><img src="../../../static/icon/shezhi.png" alt=""></div>
          </div>
     </div>
     <div class="myorder">
          <p>我的订单</p>
          <div class="orderwap">
            <div><img src="../../../static/icon/daifukuan.png" alt=""><span>待支付</span></div>
            <div><img src="../../../static/icon/daifahuo.png" alt=""><span>待收货</span></div>
            <div><img src="../../../static/icon/qiandao.png" alt=""><span>已完成</span></div>
            <div><img src="../../../static/icon/shanchu.png" alt=""><span>已取消</span></div>
          </div>
     </div>
     <div class="list">
       <ul>
         <li @click="toApply" v-if="appl"> <img src="../../../static/icon/zengjia.png" alt=""> 成为团长</li>
          <li v-if="!appl"> <img src="../../../static/icon/zengjia.png" alt=""> 下单查看</li>
          <li v-if="!appl"> <img src="../../../static/icon/mongey1.png" alt=""> 佣金管理</li>
         <li> <img src="../../../static/icon/weixinzhifu.png" alt=""> 优惠卷</li>
         <li> <img src="../../../static/icon/wode.png" alt=""> 切换团长</li>
       </ul>
     </div>
  </div>
</template>
<script>
import {post,getStorage, get} from '../../utils/storage.js'
export default {
      // async created() {
      //     console.log('mypages')
      // }
      data() {
        return {
          userInfo:{

          },
          appl:true
       
        }
      },
      created () {
         this.isHead()
      },
      onLoad(){
        console.log('测试数据')
        wx.getUserInfo({
          withCredentials: 'true',
          lang: 'zh_CN',
          timeout:10000,
          success: (result) => {
             console.log(result)
             this.userInfo = JSON.parse(result.rawData)
             wx.setStorageSync('user',result.rawData);
               
             console.log(this.userInfo)
          }
        });
       
      },
      methods: {
        async isHead(){
          //判断是否是团长
          let openid = await getStorage('openid')
            let res = await get('/head/isHead',{
                openid
            })    
            console.log(res.data)
            if(res.data.code==0){
              this.appl = false
            }
        },
        toApply(){
          wx.navigateTo({
            url: '/pages/Apply/main'
          });
          
        }
      }
}
</script>
<style lang='scss' scoped>
 @import './style.scss';    
</style>