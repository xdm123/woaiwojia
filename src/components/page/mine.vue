<template>
  <div class="mine">
    <div class="mine_wrap">
      <div class="loginBtn" @click="loginFn">
        <img :src="require('../../assets/img/resources/loginimg.png')" alt="">
        <span>点击登录/注册</span>
      </div>
      <p class="guanzhu">
        <img class="user-icon1" 
        :src="require('../../assets/img/resources/user-icon1.png')" alt="">
        <span>我的关注</span>
        <img class="right" :src="require('../../assets/img/resources/right.png')" alt="">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route.params)
  },
  methods:{
    loginFn:function(){
      this.$router.push({
        path:'/login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mine{
  position: fixed;
  top:1.4rem;
  width:100%;
  bottom: 1.8rem;
  background:#f2f2f2;
}
.mine_wrap{
  padding:.533rem;
  padding-top:1.4rem;
}
.loginBtn{
  width:100%;
  height:2.72rem;
  background:url('../../assets/img/resources/userbg.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}
.loginBtn img{
  width:1.6rem;
  margin-left:0.7rem;
  margin-right:0.3rem;
}
.loginBtn span{
  color:#fff;
  font-size: .5rem
}
.guanzhu{
  width:100%;
  height:1.467rem;
  line-height: 1.467rem;
  background:#fff;
  border-radius: 10px;
  // display: flex;
  // align-items: center;
  font-size: 15px;
  margin-top:20px;
  overflow: hidden;
  position: relative;
  
}
.user-icon1{
  width:.53rem;
  margin-left:20px;
  margin-right:20px;
  vertical-align: middle;
  margin-top: -4px;
}
.right{
  float:right;
  width:0.25rem;
  vertical-align: middle;
  position: absolute;
  top:50%;
  right:20px;
  transform: translateY(-50%);
}
</style>