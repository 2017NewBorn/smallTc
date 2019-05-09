<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="getUser">登陆</button>
    <button @click="btn1">注册</button>
  </div>
</template>
<script>
import { post, get } from "../../utils/storage.js";
export default {
  methods: {
   async  getUser(e) {
      if (e.mp.detail.rawData) {
        wx.login({
          success: async function(res) {
            console.log(res.code);
            let data = await post("/user/login", {
              code: res.code
            });

            //将获取到的openid存入session中    
            wx.setStorageSync('openid', data.data.openId);
          }
        });
        //到这一步授权成功，跳转到用户自己的用户界面
        wx.switchTab({
          url: '/pages/my/main'
        });
          
          
      } else {
        wx.showToast({
          icon: "none",
          title: "未授权,授权才能使用程序的功能哦"
        });
      }
    },
    async btn1() {
      console.log("123");
    }
  }
};
</script>
<style lang='scss' scoped>
</style>