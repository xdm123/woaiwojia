import {mapState} from 'vuex'
import {houseList,areadata,subwaydata} from '../../../public/api'
import qs from 'qs'
export default {
  data(){
    return{
      title:'二手房',
      tabdata:[
        {
          name:'区域',
          selected:false
        },{
          name:'价格',
          selected:false
        },{
          name:'房型',
          selected:false
        },{
          name:'更多',
          selected:false
        }
      ],
      list:[], //列表数据
      load:false, //数据加载完成
      total:0, //房源总数
      totalShow:false, //显示共找到多少套房源
      isNeedShowTotal:true, //是否需要显示共找到多少套
      //接口参数
      postdata:{
        page:1,
        pcount:15,
      },

      //控制样式参数
      tabIndex:4, //tab选中后文字颜色
      shadow:false, //底部蒙版
      areaLeaveAindex:0, //区域选择一级菜单文字颜色
      areaLeaveBindex:999, //区域选择一级菜单文字颜色

      //区域筛选
      jrollB:'', 
      jrollC:'', 
      areaLeaveA:['区域','地铁','附近'],
      areaLeaveB:[],
      areaLeaveC:[],
      areaLeaveB0:[], //区域数据
      areaLeaveB1:[], //地铁数据
      areaLeaveB2:[{name:'1km',id:1},{name:'2km',id:2},{name:'5km',id:5}], //附近信息
      timerB:''
    }
  },
  computed:{
    ...mapState([
      'cityid'
    ])
  },
  components:{
    Head:(res) => {require(['../../common/header.vue'],res)},
    Bscroll:(res) => {require(['../../common/scroll.vue'],res)},
    Load:(res) => {require(['../../common/load.vue'],res)},
    Listdata:(res) => {require(['../../common/listdata.vue'],res)}
  },
  mounted(){
    this.getListData();
    this.getAreaData();
    this.getLineData();
  },
  methods:{
    goBack:function(){
      // console.log(1);
      this.$router.go(-1)
    },

    //请求数据
    getListData:function(){
      var _this = this
      console.log(_this.postdata);
      var url = houseList.replace('cityid',this.cityid);
      this.$http.post(url,qs.stringify(_this.postdata)).then(function(data){
        console.log(data)
        _this.list = _this.list.concat(data.data.data.list)
        _this.load = true
        if(_this.isNeedShowTotal){
          _this.totalShow = true
          setTimeout(() => {
            _this.totalShow = false
          },1500)
        }
        _this.total = data.data.data.count
        
      }).catch(function(error){

      })
    },

    //获取区域数据
    getAreaData:function(){
      var _this = this
      var url = areadata.replace('cityid',this.cityid)
      this.$http.post(url).then(function(data){
        console.log('区域',data);
        _this.areaLeaveB = data.data.data
        _this.areaLeaveB0 = data.data.data
      }).catch(function(error){
        console.log(error);
      })
    },   

    //获取地铁数据
    getLineData:function(){
      var _this = this
      var url = subwaydata.replace('cityid',this.cityid)
      this.$http.post(url).then(function(data){
        console.log(data);
        // _this.areaLeaveB = data.data.data
        _this.areaLeaveB1 = data.data.data
      }).catch(function(error){
        console.log(error);
      })
    },

    //上拉加载
    loadMore:function(){
      console.log('上拉加载');
      this.isNeedShowTotal = false;
      this.load = false
      this.postdata.page = this.postdata.page + 1
      this.getListData()
    },

    //tab按钮点击
    tabClick:function(e){
      console.log(e);
      var index = e.currentTarget.dataset.index;
      console.log(index);
      if(index == this.tabIndex){
        //点击同一个按钮切换显示隐藏
        this.tabIndex = 4;
        this.shadow = false
      }else{
        this.tabIndex = index
        this.shadow = true;
        // 初始化jroll插件
        if(index == 0){
          var _this = this
          clearTimeout(_this.timerB)
          _this.timerB = setTimeout(() => {
            var leave_b_id = this.$refs.area_leave_b.id
            console.log(leave_b_id);
            _this.jrollB = new JRoll("#" + leave_b_id , {scrollBarY:true});
          })
        }
      }
      
    },

    //区域筛选一级菜单点击事件
    areaLeaveAClick:function(e){
      var index = e.currentTarget.dataset.index;
      this.areaLeaveAindex = index;
      this.areaLeaveC = []
      console.log(this.jrollB)
      if(index == 0){
        this.areaLeaveB = this.areaLeaveB0
      }else if(index == 1){
        this.areaLeaveB = this.areaLeaveB1
      }else if(index == 2){
        this.areaLeaveB = this.areaLeaveB2
      }
      var _this = this
      this.$nextTick(function(){
        _this.jrollB.refresh();
        _this.jrollB.scrollTo(0,0);
      })
    },

    //区域筛选二级菜单点击事件
    areaLeaveBClick:function(e){
      var index = e.currentTarget.dataset.index;
      this.areaLeaveBindex = index
      var _this = this
      if(this.areaLeaveAindex == 0){
        this.areaLeaveC = this.areaLeaveB[index].sqlist;
      }else if(this.areaLeaveAindex == 1){
        this.areaLeaveC = this.areaLeaveB[index].stationlist;
      }
      this.$nextTick(function(){
        // 初始化jroll插件
        if(_this.jrollC == ''){
          if(index == 0 || index == 1){
            var leave_c_id = this.$refs.area_leave_c.id
            _this.jrollC = new JRoll("#" + leave_c_id , {scrollBarY:true});
          }
        }else{
          _this.jrollC.refresh();
          _this.jrollC.scrollTo(0,0);
        }
      })
    },
  }
}