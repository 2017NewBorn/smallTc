<template>
  <div class="index">
     <div class="search">
       <input type="text" placeholder="搜索商品">
       <icon type="search" size='20'/>
     </div>
     <div class="time">
     </div>
     <div>
       <ul>
         <li>
           
         </li>
       </ul>
     </div>
     <div class="indexFoodsList">
       <ul>
         <li v-for="(item,index) in remFoodslist" :key="index">
           <div class="foodswap">
              <img :src="item.foodsImgList[0]" alt="">
              <div>
                <p>{{item.foodsName}} </p>
                <p>*{{item.foodsdescribe}}</p>
                <div>
                  <p>已团0份</p><p>剩余{{item.number}}份</p>
                </div>
                <p class="money"><span>￥</span>{{item.foodsPrice}}</p>
               <button>+</button>
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
       console.log('123')
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
     },
     data () {
       return {
          user:{},
          remFoodslist:[]
       }
     },
     methods: {
        async getFoodslist(){
          let res = await get('/foods/getFoodsList',{
            start:0
          })
          console.log(res)
          this.remFoodslist = res.data.data
        }
     }
     
}
</script>
<style lang='scss'>
 @import './style.scss';    
</style>