<template>
  <div class="tabbar_wrap" 
  :style="{
    background:listData.tabBg,
    top:listData.position == 'top' ? 0 :'',
    bottom:listData.position == 'bottom' ? 0 :''
  }">
    <ul class="tabbar_ul">
      <li 
      v-for="item in listData.tabList" 
      :key="item.id" 
      :data-id='item.id'
      :data-path='item.pathName'
      :data-headTitle='item.headTitle'
      @click="tabclick">
        <img :src="selectIndex == item.id ? item.iconPath : item.selectIconPath" alt="">
        <p 
        :style="{color:selectIndex == item.id ? item.selectColor : item.color}">
        {{item.title}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      default:[],
      required:true
    }
  },
  computed:{
    listData(){
      return this.data
    }
  },
  mounted(){
    
  },
  data(){
    return{
      selectIndex:0
    }
  },
  methods:{
    tabclick:function(e){
      this.selectIndex = e.currentTarget.dataset.id;
      let routerpath = e.currentTarget.dataset.path;
      let headtitle = e.currentTarget.dataset.headtitle
      this.$emit('settitle',headtitle)
      this.$router.push({
        name:routerpath,
        params:{
          
        }
      })
    }
  }
}
</script>

<style>
.tabbar_wrap{
  width:100%;
  background:#fff;
  position: fixed;
  bottom: 0;
  left:0;
  height:1.8rem;
  display: flex;
  align-items: center;
}
.tabbar_ul{
  width:100%;
  height:100%;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.tabbar_ul li{
  float:left;
  flex: 1;
  text-align: center;
}
.tabbar_ul li img{
  display: block;
  width:0.8rem;
  margin:0 auto;
  margin-bottom: 5px;
}
</style>