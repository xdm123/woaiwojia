<template>
  <div id="app">
    <Header :title='title'></Header>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <Tabbar :data='tabConfig' @settitle='setTitle'></Tabbar>
    <div class="allmap" id="allmap"></div>
    <Load v-if="!load"></Load>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {homedataurl,getcityid} from './public/api'
import {SET_TITLE,SET_HOME_DATA,SET_CITYNAME,SET_CITYID,SET_CITYDATA,SET_CITYLOCATION,SET_POSITION} from './store/motution_types'
import BMap from 'BMap'
export default {
  name: 'App',
  computed:{
    ...mapState([
      'title',
      'homedata',
      'cityid'
    ])
  },
  data(){
    return{
      transitionName:'',
      load:false,
      tabConfig:{
        tabBg:'#fff', //tabbar背景颜色
        position:'bottom', //tabbar位置 top/bottom
        tabList:[
          {
            id:0,
            title:'首页', //标题
            headTitle:'我爱我家',
            iconPath:require('./assets/img/resources/bar-home-cur.png'), //默认图标
            selectIconPath:require('./assets/img/resources/bar-home.png'), //选中后图标
            color:'#777', //默认文字颜色
            selectColor:'#222', //选中后文字颜色,
            pathName:'home'
          },
          {
            id:1,
            title:'我的',
            headTitle:'个人中心',
            iconPath:require('./assets/img/resources/bar-my-cur.png'),
            selectIconPath:require('./assets/img/resources/bar-my.png'),
            color:'#777',
            selectColor:'#222',
            pathName:'mine'
          }
        ]
      }
    }
  },
  components:{
    Header:(res) => {require(['./components/common/header'],res)},
    Tabbar:(res) => {require(['./components/common/tabbar'],res)},
    Load:(res) => {require(['./components/common/load'],res)}
  },
  mounted(){
    this.getCityName()
  },
  methods:{
    ...mapMutations([
      SET_TITLE,
      SET_HOME_DATA,
      SET_CITYNAME,
      SET_CITYID,
      SET_CITYDATA,
      SET_CITYLOCATION,
      SET_POSITION
    ]),
    setTitle:function(title){
      this.SET_TITLE(title)
    },
    //获取猜你喜欢房源
    gethomedata:function(id){
      // console.log(id)
      var _this = this
      var url = homedataurl.replace('cityid',id)
      this.$http.post(url).then(function(data){
        _this.SET_HOME_DATA(data.data.data);
        _this.load = true
        // console.log(_this.homedata)
      }).catch(function(error){

      })
    },

    //获取定位信息
    getCityName:function(){
      var _this = this
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398,39.897445);
      map.centerAndZoom(point,12);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){  
        console.log(r)
        //--------------------------------------------------------------------保存经纬度
        var position = r.longitude + ',' + r.latitude
        _this.SET_POSITION(position)
        _this.SET_CITYNAME(r.address.city)
        _this.SET_CITYLOCATION(r.address.city)
        var cityname = r.address.city.substr(0,2)
        // console.log(cityname);
        //获取所有城市
        _this.$http.post(getcityid).then(function(data){
          _this.SET_CITYDATA(data.data.data)
          // console.log(data.data.data);
          data.data.data.map(function(item){
            if(item.name == cityname){
              // console.log(item.id);
              _this.SET_CITYID(item.id)
              _this.gethomedata(item.id)
            }
          })
        }).catch(function(error){

        })
      });
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    },
    cityid(){
      // console.log('id变化了')
      this.load = false
      this.gethomedata(this.cityid)
    }

  }
}
</script>

<style>
input,input:focus,input:active{user-select: text;-webkit-user-select:text;zoom:1;}
iframe{
  display: none;
}
#app,html,body{
  width:100%;
  height:100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
