<template>
  <div class="head_wrap">
    <p 
    v-if="btn"
    class="city_return" 
    @click="cityReturn"></p>
    {{title}}
  </div>
</template>

<script>
export default {
  props:{
    title:{
      default:'我爱我家',
      required:true
    },
    btn:{
      default:false
    }
  },
  methods:{
    cityReturn:function(){
      this.$emit('goback')
    }
  }
}
</script>

<style>
  .head_wrap{
    width:100%;
    height:1.2rem;
    text-align: center;
    font-size: 14px;
    color:#000;
    line-height: 1.2rem;
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
    background:#fff;
  }
  .city_return{
    width:1.2rem;
    height:1.2rem;
    background:url('../../assets/img/resources/return.png') no-repeat center;
    background-size: 44%;
    position: absolute;
    left: 0;
  }
</style>