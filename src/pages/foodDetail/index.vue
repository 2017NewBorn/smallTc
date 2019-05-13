<template>
  <div class="goods">
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        duration="1000"
      >
        <block v-for="(item, index) in FoodsDetail.foodsImgList " :key="index">
          <swiper-item class="swiper-item">
            <img :src="item" class="slide-image"/>
          </swiper-item>
        </block>
      </swiper>
      <div class="foodsTitle">
         <div>
           <p><span>￥</span><span>{{FoodsDetail.foodsPrice}}元</span></p>
           <p>已团0份,仅剩{{FoodsDetail.number}}份</p>
         </div>
         <div>
           <p>距结束</p>
           <p></p>
         </div>
      </div>
      <div>

      </div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{FoodsDetail.foodsName}}</p>
        <p>周六11号配送</p>
         <p>{{FoodsDetail.foodsName}}</p>
      </div>
    </div>
    <!-- <div class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div> -->
    <div class="section-nav">
      <div>用户评价</div>
      <div></div>
    </div>
    <!-- <div class="attribute">
      <div class="head">商品参数</div>
      <div  class="item">
        <div></div>
        <div></div>
      </div>
    </div> -->
    <div v-if="FoodsDetail.content" class="detail">
       <wxParse :content='FoodsDetail.content'/>
    </div>
    <!-- 常见问题 -->
    <!-- <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">常见问题</text>
        <div class="line"></div>
      </div>
      <div class="b">
        <div class="item">
          <div class="question-box">
            <text class="spot"></text>
            <text class="question"></text>
          </div>
          <div class="answer"></div>
        </div>
      </div>
    </div> -->
    <!-- 常见问题 -->
    <!-- 大家都在看 -->

    <!-- <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">大家都在看</text>
        <div class="line"></div>
      </div>
      <div class="sublist">
        <div>
          <img  alt>
          <p></p>
          <p>￥</p>
        </div>
      </div>
    </div> -->

    <!-- 大家都在看 -->
    <div class="bottom-fixed">
      <div>

      </div>
      <div >
        <div >
          <img style="width:44rpx;height:44rpx;" src="../../../static/images/ic_menu_shoping_nor.png" alt="">
        </div>
      </div>
      <div @click="purchase">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>
  </div>
</template>
<script>
import {get} from '../../utils/storage.js' 
import wxParse from 'mpvue-wxparse'
export default {
  components: {
    wxParse
  },
  data() {
    return {
       FoodsDetail:{

       },
       showpop: false
    }
  },
  onLoad(){
    console.log(this.$mp.page.options.id)
    this.getFoodsDetail()
  },
  methods: {
    async getFoodsDetail(){
        let id = this.$mp.page.options.id
        let res = await get('/foods/getFoodsDetail',{
          id
        })
        console.log(res)
        this.FoodsDetail=res.data.data
    },
    purchase(){
      
    }
  },
}
</script>
<style lang='scss' scoped>

@import "./style.scss";
</style>
