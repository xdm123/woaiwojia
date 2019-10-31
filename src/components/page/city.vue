<template>
  <div class="city_wrap">
    <Head :title='headtitle' :btn='true' @goback='goBack'></Head>
    <p class="city_title">定位城市</p>
    <p class="city_name">{{citylocaton}}</p>
    <p class="city_title" style="margin-top:0;">热门城市</p>
    <ul class="hot_city">
      <li 
      v-for="(item,index) in citydata" :key='index'
      :data-name='item.name'
      :data-id='item.id'
      @click="choosecity"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {SET_CITYNAME,SET_CITYID} from '../../store/motution_types'
export default {
  data(){
    return{
      headtitle:'城市选择'
    }
  },
  computed:{
    ...mapState([
      'citylocaton',
      'citydata'
    ])
  },
  components:{
    Head:(res) => {require(['../common/header'],res)}
  },
  methods:{
    ...mapMutations([
      SET_CITYNAME,
      SET_CITYID
    ]),
    choosecity:function(e){
      console.log(e);
      var name = e.currentTarget.dataset.name
      var id = e.currentTarget.dataset.id
      this.SET_CITYNAME(name)
      this.SET_CITYID(id)
      this.$router.go(-1)
    },
    goBack:function(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='scss'>
  .city_wrap{
    width:100%;
    height:100%;
    background:#fff;
    position: absolute;
    z-index: 100;
  }
  .city_title{
    height:1.067rem;
    line-height: 1.067rem;
    width:100%;
    color: #a1a2a4;
    background-color: #eeeff4;
    text-indent: 12px;
    font-size: .4rem;
    margin-top: 1.2rem;
  }
  .city_name{
    height:1.067rem;
    line-height: 1.067rem;
    width:100%;
    padding:.333rem 0;
    text-indent: 12px;
    font-size: .4rem;
    color: #a1a2a4;
  }
  .hot_city{
    display: flex;
    padding:10px;
    flex-flow: wrap;
    // justify-content: space-between;
  }
  .hot_city li{
    width:21%;
    margin:2% 2%;
    line-height: .933rem;
    text-align: center;
    background:#eeeff4;
    border-radius: 5px;
    font-size: .4rem;
  }
  .city_head{
    line-height: 1.067rem;
    text-align: center;
    position: relative;
    font-size: 15px;
  }

</style>