import Vue from 'vue'
import Router from 'vue-router'
let Home = (res) => {require(['../components/page/home.vue'],res)}
let Mine = (res) => {require(['../components/page/mine.vue'],res)}
let City = (res) => {require(['../components/page/city.vue'],res)}
let Sale = (res) => {require(['../components/page/sale/sale.vue'],res)}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home',
      component:Home,
      meta:{index:0},
      name:'home'
    },
    {
      path:'/mine',
      component:Mine,
      meta:{index:1},
      name:'mine'
    },
    {
      path:'/city',
      component:City,
      meta:{index:1},
      name:'city'
    },
    {
      path:'/sale',
      component:Sale,
      meta:{index:1},
      name:'sale'
    },
    {
      path:'*',
      redirect:'/home',
      meta:{index:0},
    }
  ]
})
