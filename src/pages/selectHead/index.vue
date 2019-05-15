<template>
  <div>
      <p>广州市</p>
       <h1>选择团长</h1>
       <ul>
           <li v-for="(item,index) in selectHeadList" :key="index" @click="select(index)">
               <div>
                  <p>{{item.name}}</p>
                  <p>{{item.address}}</p>
               </div>
           </li>
       </ul>
  </div>
</template>
<script>
import {getStorage,get} from '../../utils/storage.js'
export default {
     data () {
         return {
             selectHeadList:[]
         }
     },
     onLoad(){
         this.getSeletHead()
     },
     methods: {
        async getSeletHead(){
           let res = await get('/head/searchHead',{
               city:'广州市'
           })
           console.log(res)
           this.selectHeadList = res.data.data
         },
         select(value){
           console.log(value)
           wx.setStorageSync('selecthead', this.selectHeadList[value]);
           wx.switchTab({
               url: '/pages/index/main'
           });
             
         }
     } 
}
</script>
<style lang='scss'>
@import './style.scss';
</style>