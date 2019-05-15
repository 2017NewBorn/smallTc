<template>
  <div class="index">
     <div class="search">
       <input type="text" placeholder="搜索商品">
       <icon type="search" size='20'/>
     </div>
     <div class="head">
        <p>{{head.name}}</p>
        <p>{{head.address}}</p>
       <button>切换</button>
     </div>
     <div>
       <ul>
         <li>
           
         </li>
       </ul>
     </div>
     <div class="indexFoodsList">
       <ul>
         <li v-for="(item,index) in remFoodslist" :key="index" @click="toDetail(item.id)">
           <div class="foodswap">
              <img :src="item.foodsImgList[0]" alt="">
              <div>
                <p>{{item.foodsName}} </p>
                <p>*{{item.foodsdescribe}}</p>
                <div>
                  <p>已团0份</p><p>剩余{{item.number}}份</p>
                </div>
                <p class="money"><span>￥</span>{{item.foodsPrice}}</p>
               <button @touchstart.stop='addTocart(item.id)'>+</button>
              </div>
           </div>
         </li>
       </ul>
     </div>
  </div>
</template>
<script>
import {getStorage,showToast,get} from '../../utils/storage.js'
export default {
     async onLoad(){
     
       //进入页面先判断是否登陆，如果未登陆跳到登陆授权页面
       try {
         //获取缓存中的数据
       let data = await getStorage('user') 
       this.user = data
       } catch (error) {
          showToast('none','您未登陆')
           wx.navigateTo({
            url: '/pages/login/main'
          });
       }
       this.getFoodslist()
        //将用户选择的团长存放到缓存中
       //先判断用户是否有选择团长
         let selectHead = wx.getStorageSync('selecthead');
           console.log(selectHead)
           if(selectHead){
             this.head = selectHead
           }else{
           wx.navigateTo({url: '/pages/selectHead/main', });
           }
     },
     data () {
       return {
          user:{},
          remFoodslist:[],
          head:{}
       }
     },
     methods: {
        async getFoodslist(){
          let res = await get('/foods/getFoodsList',{
            start:0
          })
          console.log(res)
          this.remFoodslist = res.data.data
        },
        toDetail(value){
          console.log(value)
          wx.navigateTo({
            url:`/pages/foodDetail/main?id=${value}`
            })
        },
        async addTocart(value){
          console.log(value)

          //将商品id和数量传送给后台
          //后台即存入数据库对应的购物车
          //传参数时需要再带上用户的openid
          let openid =await getStorage('openid')
          // console.log(openid,'获取openid')
          let res = await get('/carts/addCarts',{
                   openId:openid,
                   foodsId:value,
                   count:1
            })
          }
     }
     
}
</script>
<style lang='scss'>
 @import './style.scss';    
</style>