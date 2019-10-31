<template>
  <div class="load_box">
    <img src="../../assets/img/resources/load.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style>
.load_box{
  width:1.6rem;
  height:1.6rem;
  position:fixed;
  top:50%;
  left:50%;
  margin-top:-0.8rem;
  margin-left:-0.8rem;
  z-index:99999;
  background: rgba(0,0,0,0.7);
  border-radius: .347rem;
}
.load_box img{
  width:100%;
  height:100%;
}
</style>