import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './motutions'
Vue.use(Vuex);

const state = {
  title:'我爱我家',
  homedata:'', // 首页数据
  citylocaton:'', //定位城市
  cityname:'',//城市名字
  cityid:'', //城市id
  citydata:[], //所有城市信息
}

export default new Vuex.Store({
  state,
  mutations
})

