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
         <li> <img src="../../../static/icon/zengjia.png" alt=""> 成为团长</li>
         <li> <img src="../../../static/icon/weixinzhifu.png" alt=""> 优惠卷</li>
         <li> <img src="../../../static/icon/wode.png" alt=""> 切换团长</li>
       </ul>
     </div>
  </div>
</template>
<script>
import {post,getStorage} from '../../utils/storage.js'
export default {
      // async created() {
      //     console.log('mypages')
      // }
      data() {
        return {
          userInfo:{

          }
        }
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
          },
          fail: () => {},
          complete: () => {}
        });
        // getStorage('openid').then(async res=>{
        //     let data = await post('/user/setUserInfo',{
        //        openid:res.data
        //     })
        // })
      }
}
</script>
<style lang='scss' scoped>
 @import './style.scss';    
</style>