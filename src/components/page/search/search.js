let Head  = (res) => require(['../../common/header.vue'],res)
export default {
  data(){
    return{
      title:'搜索'
    }
  },
  components:{
    Head
  },
  methods:{
    goBack:function(){
      this.$router.go(-1)
    }
  }
}