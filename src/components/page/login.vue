<template>
    <div class="login_wrap">
      <Head :title="title" :btn=true @goback='goBack'></Head>
      <div  v-if="showdata == 0">
        <p class="loginImg"></p>
        <p class="wx_login" @click="wxlogin">微信登录</p>
        <p class="phone_login" @click="sjlogin">手机登录</p>
      </div>
      <div v-if="showdata == 1"> 
        <img class="wxloginimg" 
        :src='require("../../assets/img/resources/wxlogin.jpg")'
        alt="">
        <p class="wx_login">扫码登录</p>
      </div>
      <div class="phone" v-if="showdata == 2"> 
        <div class="input_num">
          <span>手机号码</span>
          <input 
          type="number" 
          maxlength="11" 
          placeholder="请输入手机号码">
          <p>获取验证码</p>
        </div>
        <div class="input_num">
          <span>验证码</span>
          <input type="number" maxlength="6" placeholder="输入六位验证码">
        </div>
        <p class="phone_login_btn">登录</p>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      title:'登录',
      showdata:0
    }
  },
  components:{
    Head:(res) => {require(['../common/header'],res)}
  },
  methods:{
    goBack:function(){
      this.$router.go(-1)
    },
    wxlogin:function(){
      this.showdata = 1
      this.title = '微信登录'
    },
    sjlogin:function(){
      this.showdata = 2
      this.title = '手机登录'
    }
  }
}
</script>

<style lang='scss' scoped>
  .login_wrap{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#fff;
    z-index: 20000;
  }
  .loginImg{
    width:3.813rem;
    height:2.76rem;
    background:url('../../assets/img/resources/login-img.png') no-repeat;
    background-size: 100% 100%;
    margin:3rem auto 0;
  }
  .phone_login_btn{
    width:100%;
    text-align: center;
    height:1.2rem;
    line-height: 1.2rem;
    background:#fff;
    margin:50px auto 0;
    border-radius: 10px;
    color:#fff;
    font-size: 16px;
    background:linear-gradient(to right,#ffc30e,#ffad00);
  }
  .wx_login{
    width:90%;
    text-align: center;
    height:1.2rem;
    line-height: 1.2rem;
    background:#fff;
    margin:80px auto 0;
    border-radius: 10px;
    color:#fff;
    font-size: 16px;
    background:linear-gradient(to right,#ffc30e,#ffad00);
  }
  .phone_login{
    width:90%;
    text-align: center;
    height:1.2rem;
    font-size: 16px;
    line-height: 1.2rem;
    background:#fff;
    border:1px solid #ffbb09;
    color:#292b33;
    margin:20px auto;
    border-radius: 10px;
  }
  .wxloginimg{
    display: block;
    margin:3rem auto;
  }
  .phone{
    width:90%;
    margin:2rem auto 10px;
    font-size: 14px;
    .input_num{
      border-bottom: 1px solid #ededed;
      line-height: 1.4rem;
    }
    span{
      display: inline-block;
      width:18%;
    }
    input{
      border:none;
      height:100%;
      text-indent: 10px;
      display: inline-block;
    }
    p{
      float:right;
    }
  }
</style>