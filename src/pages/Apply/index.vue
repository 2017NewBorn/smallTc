<template>
  <div class="apply">
     <p class="name"><span>姓名:</span><input v-model="name" type="text" placeholder="您的姓名"></p>
     <p class="phone"><span>电话:</span><input v-model="phone" type="text" placeholder="您的电话"></p>
     <p class="address"><span>地址:</span><input v-model="address" type="text" placeholder="您的地址"></p>
     <button @click="register">立即申请</button>
  </div>
</template>
<script>
import {get,getStorage} from '../../utils/storage.js'
export default {
     data () {
       return {
         name:'',
         phone:'',
         address:'',
         longitude:'',
         latitude:'',
         city:''      
       }
     },
     onLoad(){
       //进入时获取用户的经纬度
       wx.getLocation({
         type: 'wgs84',
         altitude: false,
         success: (result) => {
           console.log(result)
           this.latitude = result.latitude
           this.longitude = result.longitude
         },
         fail: () => {
           console.log('用户没有定位')
         }
       });
         this.getCity()
     },
     methods: {
       async register(){
          let openid = await getStorage('openid')
           let res = await get('/head/addHeader',{
                 name:this.name,
                 phone:this.phone,
                 address:this.address,
                 latitude:this.latitude,
                 longitude:this.longitude,
                 city:this.city,
                 openid 
           })
       },
       async getCity(){
         var reqTask = wx.request({
           url: 'http://120.79.136.48:8080/yoho/address/getAddressByIp',
           header: {'content-type':'application/json'},
           method: 'POST',
           dataType: 'json',
           responseType: 'text',
           success: (result) => {
             console.log(result.data.data)
             this.city = result.data.data.cityName
           }
         });
        //  let res = await get('http://120.79.136.48:8080/yoho/address/getAddressByIp')
        //  console.log(res.data)
       }
     }
}
</script>
<style lang='scss'>
 @import './style.scss';    
</style>