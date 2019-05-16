<template>
   <div class="cart">
    <div class="cartlist">
      <!--  -->
      <div class="item" @touchstart="startMove" @touchmove="deleteGoods" @touchend="endMove" :data-index="index" v-for="(item,index) in listData"
        :key="index">
        <div class="con" :style="item.textStyle">
          <div class="left">
            <div class="icon" @touchstart.stop="changeColor(index,item.foodsid)" :class="[Listids[index]?'active':'',{active:allcheck}]"></div>
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <div class="info">
              <p>{{item.name}}</p>
              <p>￥{{item.foodsPrice}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">
              x{{item.count}}
            </div>
          </div>
        </div>
        <div class="delete" :style="item.textStyle1" @touchstart.stop="deleteFoods(item.foodsid)">
          <div>
            删除
          </div>
        </div>

      </div>
    </div>
    <div v-if="false" class="nogoods">
      <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png" alt="">
    </div>
    <div class="fixed">
      <div @click="allCheck" :class="{active:allcheck}" class="left">
        全选({{isCheckedNumber}})
      </div>
      <div class="right">
        <div>
          ￥{{allPrise}}
        </div>
        <div @click="orderDown">购买</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getStorage,get,post} from '../../utils/storage.js'
import indexVue from '../index/index.vue';
export default {
  data () {
    return {
        listData:[],
        startX:"",
        startY:"",
        tranX:0,//移动后的x
        tranX1:0,//
        moveX:"",
        moveY:"",
        moveEndX:"",
        moveEndY:"",
        X:0,
        Y:'',
        flag:false,
        allcheck:false,
        Listids:[]
        
    }
  },
   async onShow(){
         this.getCarts()
         this.initTextStyle()
   },
   
    methods: {
        async getCartNum(){
          const openid  = await getStorage('openid')
          let res = await get('/carts/getCartItemSum',{
            openid
          })
          if(res.data.data.num==0){
            wx.removeTabBarBadge({
              index: 2
            });
          }
          else{
            wx.setTabBarBadge({
                index: 2,
                 text: `${res.data.data.num}`
             });
          }
        },
     async getCarts(){
          let openid = await getStorage('openid')
          let res = await get('/carts/searchCart',{
                 openid
          })
         console.log(res)
         this.listData = res.data.data.foodsList 
         console.log(this.listData)
      },
      async deleteFoods(id){
          console.log(id)
          let openid = await getStorage('openid')
          let res = await get('/carts/removeCart',{
             openid,foodsid:id
          })
          this.getCarts()
          //重新请求购物车更新视图
          this.getCartNum()
       },
       initTextStyle(){
             //滑动之前先初始化数据
             for(let i=0;i<this.listData.length;i++)
             {
               this.listData[i].textStyle=""
               this.listData[i].textStyle1=""
             }
        },
        startMove(e){
          this.initTextStyle()
          //初始化样式
          console.log(e,'touchstart')
          this.startX=e.touches[0].pageX
          //点击时候的x轴
          this.startY=e.touches[0].pageY
          //点击时候y轴的坐标
        },
        deleteGoods(e){
          //滑动之前初始化样式数据
          this.initTextStyle()
          console.log(e,'正在滑动')
           let index = e.currentTarget.dataset.index
           console.log(this.X,'x')
           if(this.X<=-100){
             this.flag = true
           }
           if(!this.flag){

             this.moveX = e.touches[0].pageX
             this.moveY = e.touches[0].pageY
             this.X = this.moveX-this.startX
             this.Y = this.moveX-this.startY
             this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx)`;
             if(this.X>=100){
               this.X=0
             }
             this.tranX = this.X
             if(this.X<=-100){
               this.X=-100
             }
             this.tranX1 = this.X
             this.listData[index].textStyle1 =`transform:translateX(${this.tranX1}rpx)`
           }else{
             this.moveX = e.touches[0].pageX
             this.moveY = e.touches[0].pageY
             this.X=this.moveX-this.startX
             this.Y=this.moveY-this.startY
             this.tranX = this.X-100
             this.listData[index].textStyle = `transform:translateX(-100rpx)`
              console.log('heyushuo')
            if(this.X+-100>-100){
              this.flag = false
            }
            this.tranX1 = -100
            this.listData[index].textStyle1 = `transform:translateX(-100rpx)`
         }
        },
        endMove(e){
          //滑动结束
          this.initTextStyle()
          let index = e.currentTarget.dataset.index
          console.log(e,'滑动结束时调用')
          if(this.X>-50){
            this.tranX1 =0
            this.tranX =0
            this.listData[index].textStyle=`transform:translateX(${this.tranX}rpx)`
            this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx)`
          }else if(this.x<=-50){
            this.tranX1 = -100
            this.tranX =-100
            this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx)`
            this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx)`
         }
        },
       async orderDown(){
          console.log(this.Listids)
          let openid = await getStorage('openid')
          let newArr=[]
          for(let i=0;i<this.Listids.length;i++){
            if(typeof this.Listids[i]=='number'){
                 newArr.push(this.Listids[i])
            }
          }
          console.log(newArr)
          if(newArr.length>0){
            //勾选过商品
             let res = await post('/order/createOrder',{
               openid,paylist:newArr
             })
          }else{
            console.log('您未选择任何商品')
            wx.showModal({
              title: '请选择商品',
              content: '您未选择任何商品',
              showCancel: true,
              cancelText: '取消',
              cancelColor: '#000000',
              confirmText: '确定',
              confirmColor: '#3CC51F'
            });
          }
        },
        allCheck(){
              //先清空
              this.Listids=[]
              if(this.allcheck){
                //如果已经全选就全不选
                this.allcheck = false
              }else{
                console.log('选择全部')
                this.allcheck = true
                //遍历所有商品的id
                for(let i=0;i<this.listData.length;i++){
                  const element = this.listData[i]
                  this.Listids.push(element.foodsid)
                }
              }
        },
        changeColor(index,id){
           console.log(index,id)
           if(this.Listids[index]){
             //如果Listids中已经存在了这个商品
             this.$set(this.Listids,index,false)
           }else{
             this.$set(this.Listids,index,id)
           }
        }
    },
    computed: {
      isCheckedNumber(){
        let number = 0
        for(let i=0;i<this.Listids.length;i++)
        {
          //计算属性计算所选择的商品数量
          if(this.Listids[i]){
            number++
          }
        }
        if(number ==this.listData.length &&number!=0){
          this.allcheck=true
        }else{
          this.allcheck=false
        }
        return number
      },
      allPrise(){
        let Price = 0
        for(let i=0;i<this.Listids.length;i++){
          if(this.Listids[i]){
            Price = Price+this.listData[i].foodsPrice*this.listData[i].count
          }
        }
        return Price
      } 
    }
}
</script>
<style lang='scss' scoped>
@import './style.scss';
</style>