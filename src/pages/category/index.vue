<template>
  <div class="category">
    <div class="search" >
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索,共239款好物</span>
      </div>

    </div>
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" v-for="(item, index) in  categoryList"  @click="selectitem(item.cateGoryId)"  :key="index">
          {{item.cateGoryName}}
        </div>
      </scroll-view>
      <scroll-view class="right" scroll-y="true">
        <div class="bottom">
          <div v-for="(item,index) in foodsList" :key="index" class="item">
            <img :src="item.foodsImgList[0]" alt="">
            <span>{{item.foodsName}}</span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import {get} from '../../utils/storage.js'
export default {
     data () {
       return {
          categoryList:[],
          foodsList:[]
       }
     },
     mounted() {
         this.Init()
     },
     methods: {
        async Init(){
            let res =  await get('/foods/getCategory')
            console.log(res)
            this.categoryList = res.data.data
            let result = await get('/foods/categoryFoods',{
              couponSelected:res.data.data[0].cateGoryId
            })
            console.log(result)
            this.foodsList = result.data.data
            console.log(this.foodsList,'列表')
         },
         async selectitem(value){
           console.log(value)
            let result = await get('/foods/categoryFoods',{
              couponSelected:value
            })
              this.foodsList = result.data.data
         }
     },
}
</script>
<style lang='scss' scoped>
@import './style.scss'  ;
</style>