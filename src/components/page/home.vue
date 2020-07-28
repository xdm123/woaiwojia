<template>
  <div class="home_wrap">
    <div class="home_inner">
      <!-- 搜索条 -->
      <div class='home_search'>
        <p class="search_city" 
        @click='chooseCity'>
          {{cityname | setCityName}}
          <img src="../../assets/img/resources/city-arrow.png" alt="">
        </p>
        <p class='search_name' @click="toSearchPage">
          <img src="../../assets/img/source/list-magnifier.png" alt="">
          请输入小区商圈或名称
        </p>
      </div>
      <!-- 搜索条End -->

      <!-- banner nav -->
      <img class='home_banner' src="../../assets/img/resources/home-banner.png" alt="">
      <ul class="home_nav">
        <li 
        v-for="(item) in navlist"
        @click="toListPage" 
        :data-id='item.id'
        :key='item.id'>
          <img :src="item.iconpath" alt="">
          <p>{{item.navitem}}</p>
        </li>
      </ul>
      <!-- banner nav End -->

      <!-- 猜你喜欢 -->
      <h1 class="guess">猜你喜欢</h1>
      <ul class="recommend_list">
        <li v-for="item in homedata.recommendHouses" :key='item.housesid'>
          <div class="rec_left">
            <img class='rec_house_pic' :src='item.imgurl' alt="">
            <span>{{item.housetag}}</span>
            <img @error='loadPicFail' class="icon_3d" src="../../assets/img/resources/icon3d.png" alt="">
          </div>
          <div class="rec_right">
            <p class='rec_house_name'>{{item.housetitle}}</p>
            <p class="rec_house_info">
              <span>{{item.roomdesc}}</span>
              <span class="dian"></span>
              <span>{{item.buildarea}}㎡</span>
              <span class="dian"></span>
              <span>{{item.heading}}</span>
              <span class="dian"></span>
              <span>{{item.communityname}}</span>
            </p>
            <p class="rec_house_label">
              <span 
              v-for="(tab,index) in item.tagwall"  :key='index'
              class='label_span'>
              {{tab}}
              </span>
            </p>
            <div class="house_price">
              <p>{{item.price}}</p>
              <span>{{item.unitprice}}</span>
            </div>
          </div>
        </li>
      </ul>
      <h2 class="all_sale" @click='toSalePage'>查看全部二手房</h2>
      <!-- 猜你喜欢End -->
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      navlist:[
        {
          iconpath:require('../../assets/img/resources/home-sale.png'),
          navitem:'二手房',
          id:0
        },
        {
          iconpath:require('../../assets/img/resources/home-rent.png'),
          navitem:'租房',
          id:1
        },
        {
          iconpath:require('../../assets/img/resources/home-xiaoqu.png'),
          navitem:'小区',
          id:2
        },
        {
          iconpath:require('../../assets/img/resources/home-broker.png'),
          navitem:'经纪人',
          id:3
        }
      ]
    }
  },
  computed:{
    ...mapState([
      'homedata',
      'cityname'
    ])
  },
  mounted(){
    
  },
  methods:{
    toSalePage:function(){
      console.log('查看全部二手房');
    },
    chooseCity:function(){
      console.log('选择城市')
      this.$router.push({
        path:'/city'
      })
    },
    toListPage:function(e){
      var btnid = e.currentTarget.dataset.id;
      if(btnid == 0){
        this.$router.push({
          path:'/sale'
        })
      }
    },
    loadPicFail:function(){
      console.log(1);
    },
    toSearchPage:function(){
      this.$router.push({
        path:'/search'
      })
      this.SET_TITLE('搜索')
    }
  },
  filters:{
    setCityName:function(value){
      return value.substr(0,2)
    }
  }
}
</script>

<style>
.home_wrap{
  position: absolute;
  top: 1.2rem;
  width:100%;
  margin:0 auto;
  padding-bottom: 1.8rem;
}
.home_inner{
  width:91%;
  margin:0 auto;
}
.home_search{
  width:100%;
  height:1.066667rem;
  border-radius: 8px;
  margin-top:5px;
  display: flex;
  font-size: .373333rem;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
.home_search p{
  height:0.5rem;
  line-height: 0.5rem;
}
.search_city{
  width:1.866667rem;
  border-right:1px solid #ccc;
  text-align:center;
}
.search_city img{
  width:15px;
  vertical-align: middle;
  margin-left: 5px;
}
.search_name{
  display: flex;
  justify-content: center;
  align-items: center;
  color:#A8A9AB;
}
.search_name img{
  width:.356667rem;
  margin-left:10px;
  margin-right:5px;
  vertical-align: middle;
}
.home_banner{
  width:100%;
  margin:.48rem auto;
}
.home_nav{
  width:100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .373333rem;
  color:#000;
}
.home_nav li{
  text-align: center;
}
.home_nav img{
  width:1.6rem;
  margin-bottom: 5px;
}
.guess{
  font-size: .533333rem;
  font-weight: 600;
  padding:.8rem 0 .266667rem 0;
}
.recommend_list li{
  padding:.36rem 0;
  overflow: hidden;
  height:auto;
}
.rec_left{
  width:2.8rem;
  float:left;
  height:2.213333rem;
  position: relative;
}
.rec_left img.rec_house_pic{
  width:100%;
  height:100%;
  border-radius: .213333rem;
}
.rec_left span{
  background: linear-gradient(to right,#ffc30e,#ff9d00);
  display: block;
  position: absolute;
  /* padding:5px 10px; */
  text-align: center;
  top:5px;
  color:#fff;
  left:5px;
  padding:3px;
  border-radius: 4px;
}
.icon_3d{
  width:.686667rem;
  position: absolute;
  bottom:5px;
  left:5px;
  animation: icon_circle 3s linear 0s infinite;
}
@keyframes icon_circle {
  0%{transform: rotate(0deg);}
  100%{transform: rotate(360deg);}
}
.rec_right{
  width:calc(100% - 3rem);
  float:right;
  padding-left:0.2rem;
}
.rec_house_name{
  width:100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:2;
  overflow: hidden;
  font-size: .426667rem;
  color:#292B33;
  font-weight: 600;
  line-height: 0.5rem;
  letter-spacing: 1px;
}
.rec_house_info{
  display: flex;
  align-items: center;
  color:#7D7E82;
  width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top:4px;
}
.dian{
  display: inline-block;
  width:3px;
  height:3px;
  border-radius: 50%;
  background:#CDCFD0;
  margin:0 3px;
}
.rec_house_label{
  width:100%;
  overflow: hidden;
}
.label_span{
  display: inline-block;
  padding:5px;
  background: #ebf5f7;
  color: #608997;
  border-radius: 3px;
  margin-top:4px;
  margin-right:3px;
}
.all_sale{
  width: 90%;
  height:1rem;
  color:#FFB102;
  text-align: center;
  line-height: 1rem;
  font-size: .433rem;
  letter-spacing: 1px;
  margin:0 auto;
  background:#F7F7F7;
}
.house_price{
  margin-top: 4px;
}
.house_price p{
  color:#FF522F;
  font-size: .373rem;
  font-weight: 600;
  display: inline;
}
.house_price span{
  color:#7d7e82;
}
</style>