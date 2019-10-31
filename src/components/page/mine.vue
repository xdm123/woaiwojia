<template>
  <div class="mine_wrap">
    <h1 id="test">我的</h1>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>
.mine_wrap{
  padding-top:1.4rem;
  h1{
    color:blue;
  }
}
</style>