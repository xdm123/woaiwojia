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
        sqid:'',
        districtid:'',
        lineid:'',
        stationid:'',
        nearby:'',
        location:'',
        price:'',
        broom:''
      },

      //控制样式参数
      tabIndex:4, //tab选中后文字颜色
      shadow:false, //底部蒙版
      areaLeaveAindex:0, //区域选择一级菜单文字颜色
      areaLeaveBindex:999, //区域选择二级菜单文字颜色
      areaLeaveCindex:999, //区域选择三级菜单文字颜色

      //区域筛选
      jrollB:'', 
      jrollC:'', 
      areaLeaveA:['区域','地铁','附近'],
      areaLeaveB:[],
      areaLeaveC:[],
      areaLeaveB0:[], //区域数据
      areaLeaveB1:[], //地铁数据
      areaLeaveB2:[{name:'1km',id:1},{name:'2km',id:2},{name:'5km',id:5}], //附近信息
      timerB:'',
      areaLeaveBname:'',

      //价格筛选
      priceTag:[],
      tagIndex:999, //选中标签下标
      minprice:'',
      maxprice:'',

      //房型筛选
      houseTag:[ //筛选房型时可选的标签
        { broom: 1, selected: false, name: '一室' },
        { broom: 2, selected: false, name: '二室' },
        { broom: 3, selected: false, name: '三室' },
        { broom: 4, selected: false, name: '四室' },
        { broom: 5, selected: false, name: '五室' },
        { broom: 9, selected: false, name: '五室以上' }
      ]
    }
  },
  computed:{
    ...mapState([
      'cityid',
      'citypositon'
    ])
  },
  watch:{
    minprice(value){
      this.tagIndex = 999
    },
    maxprice(value){
      this.tagIndex = 999
    }
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
    this.setPriceTag();
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
        // console.log(data)
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
        // console.log('区域',data);
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
        // console.log(data);
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
      this.load = false;
      this.postdata.page = this.postdata.page + 1;
      this.getListData();
    },

    //tab按钮点击
    tabClick:function(e){
      console.log(e);
      var index = e.currentTarget.dataset.index;
      // console.log(index);
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
            // console.log(leave_b_id);
            _this.jrollB = new JRoll("#" + leave_b_id , {scrollBarY:true});
          })
        }
      }
    },

    // -------------------------------------------------区域

    //区域筛选一级菜单点击事件
    areaLeaveAClick:function(e){
      console.log(1111);
      var index = e.currentTarget.dataset.index;
      this.areaLeaveAindex = index;
      this.areaLeaveC = [];
      this.areaLeaveBindex = 999
      // console.log(this.jrollB)
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
      console.log(e);
      this.areaLeaveBindex = index
      this.areaLeaveCindex = 999
      var _this = this
      if(this.areaLeaveAindex == 0){
        this.areaLeaveC = this.areaLeaveB[index].sqlist;
        var id = e.currentTarget.dataset.id;
        console.log(id);
        this.postdata.districtid = id;
        this.postdata.sqid = ''
        this.areaLeaveBname = e.currentTarget.dataset.name
      }else if(this.areaLeaveAindex == 1){
        this.areaLeaveC = this.areaLeaveB[index].stationlist;
        this.postdata.lineid = e.currentTarget.dataset.id;
        this.postdata.stationid = ''
        this.areaLeaveBname = e.currentTarget.dataset.name
        console.log(this.areaLeaveC)
      }else if(this.areaLeaveAindex == 2){
        var id = e.currentTarget.dataset.id
        this.list = [];
        this.load = false;
        this.shadow = false;
        this.tabdata[this.tabIndex].name = e.currentTarget.dataset.name;
        this.tabdata[this.tabIndex].selected = true;
        this.tabIndex = 4;
        this.areaLeaveCindex = 999
        this.areaLeaveBindex = 999
        this.postdata.sqid = '';
        this.postdata.districtid = '';
        this.postdata.stationid = ''
        this.postdata.lineid = ''
        this.postdata.location = this.citypositon;
        this.postdata.nearby = id;
        this.areaLeaveC = [];
        this.getListData();
      }
      this.$nextTick(function(){
        // 初始化jroll插件
        if(_this.jrollC == ''){
          if(this.areaLeaveAindex == 0 || this.areaLeaveAindex == 1){
            console.log(index);
            var leave_c_id = this.$refs.area_leave_c.id
            _this.jrollC = new JRoll("#" + leave_c_id , {scrollBarY:true});
          }
        }else{
          _this.jrollC.refresh();
          _this.jrollC.scrollTo(0,0);
        }
      })

      
    },

    //区域二级筛选菜单不限制区域
    LeaveBlimit:function(){
      this.list = [];
      this.load = false;
      this.shadow = false;
      this.tabdata[this.tabIndex].name = '区域';
      this.tabdata[this.tabIndex].selected = false;
      this.tabIndex = 4;
      this.areaLeaveCindex = 999
      this.areaLeaveBindex = 999
      this.postdata.sqid = '';
      this.postdata.districtid = '';
      this.postdata.stationid = ''
      this.postdata.lineid = ''
      this.postdata.location = '';
      this.postdata.nearby = '';
      this.areaLeaveC = [];
      this.getListData();
    },
    //区域三级筛选菜单不限制区域
    LeaveClimit:function(e){
      console.log('不限制三级区域');
      this.list = [];
      this.load = false;
      this.shadow = false;
      this.tabdata[this.tabIndex].selected = true;
      this.tabdata[this.tabIndex].name = e.currentTarget.dataset.name;
      this.tabIndex = 4;
      this.areaLeaveCindex = 999;
      this.getListData();
      this.postdata.location = '';
      this.postdata.nearby = '';
    },
    //区域三级菜单选择商圈
    LeaveCcLick:function(e){
      var id = e.currentTarget.dataset.id;
      var name = e.currentTarget.dataset.name;
      this.list = [];
      this.load = false;
      this.shadow = false;
      this.tabdata[this.tabIndex].name = name;
      this.tabdata[this.tabIndex].selected = true;
      this.tabIndex = 4;
      if(this.areaLeaveAindex == 0){
        this.postdata.sqid = id;
        this.postdata.districtid = '';
        this.postdata.stationid = ''
        this.postdata.lineid = ''
        this.postdata.location = '';
        this.postdata.nearby = '';
      }else if(this.areaLeaveAindex == 1){
        this.postdata.sqid = '';
        this.postdata.districtid = '';
        this.postdata.stationid = id
        this.postdata.location = '';
        this.postdata.nearby = '';
        this.postdata.lineid = e.currentTarget.dataset.lineid
      }
      this.getListData();
      this.areaLeaveCindex = e.currentTarget.dataset.index
    },
    
    //点击阴影隐藏筛选条件
    hideShadow:function(){
      console.log(11)
      this.shadow = false;
      this.tabIndex = 4
    },

    //-----------------------------------------------------价格

    //根据城市id设置价格筛选标签
    setPriceTag:function(){
      var id = this.cityid
      if(this.cityid == 1 || this.cityid == 9){
        this.priceTag = [ 
          { code: '0,200', name: '200万以下' },
          { code: '200,250', name: '200-250万' },
          { code: '250,300', name: '250-300万' },
          { code: '300,400', name: '300-400万' },
          { code: '400,500', name: '400-500万' },
          { code: '500,600', name: '500-600万' },
          { code: '600,800', name: '600-800万' },
          { code: '800,1000', name: '800-1000万' },
          { code: '1000,0', name: '1000万以上' }
        ]
      }else if(id == 15 || id == 22 || id == 24 || id == 6 || id == 16){
        this.priceTag = [ 
          { code: '0,50', name: '50万以下' },
          { code: '50,80', name: '50-80万' },
          { code: '80,100', name: '80-100万' },
          { code: '100,120', name: '100-120万' },
          { code: '120,150', name: '120-150万' },
          { code: '150,200', name: '150-200万' },
          { code: '200,300', name: '200-300万' },
          { code: '300,0', name: '300万以上' }
        ]
      }
    },

    //选择价格标签
    choosePrice:function(e){
      this.minprice = ''
      this.maxprice ==''
      this.tagIndex = e.currentTarget.dataset.index;
    },

    //确认选择价格
    confirmPrice:function(){
      this.list = [];
      this.load = false;
      this.shadow = false;
      if(this.minprice == '' && this.maxprice == ''){
        if(this.tagIndex != 999){
          this.tabdata[this.tabIndex].name = this.priceTag[this.tagIndex].name;
          this.tabdata[this.tabIndex].selected = true;
          this.postdata.price = this.priceTag[this.tagIndex].code;
        }else{
          this.tabdata[this.tabIndex].name = '价格';
          this.tabdata[this.tabIndex].selected = false;
          this.postdata.price = '';
        }
      }else{
        if(this.minprice && !this.maxprice){
          var name = this.minprice + '万以上';
          var code = this.minprice + ',' + 99999
          this.tabdata[this.tabIndex].name = name;
          this.tabdata[this.tabIndex].selected = true;
          this.postdata.price = code;
        }else if(!this.minprice && this.maxprice){
          var name = this.maxprice + '万以下';
          var code = 0 + ',' + this.maxprice
          this.tabdata[this.tabIndex].name = name;
          this.tabdata[this.tabIndex].selected = true;
          this.postdata.price = code;
        }
      }
      this.getListData();
      this.tabIndex = 4;
    },

    //清空价格选项
    cancelPrice:function(){
      this.tagIndex = 999
      this.minprice = ''
      this.maxprice = ''
    },

    //-----------------------------------------房型
    chooseBroom:function(e){
      var index = e.currentTarget.dataset.index;
      this.houseTag[index].selected = !this.houseTag[index].selected
    },
    confirmBroom:function(){
      var broomcode = [];
      var broomname = []
      this.houseTag.map((item) => {
        if(item.selected){
          broomcode.push(item.broom)
          broomname.push(item.name)
        }
      });
      if(broomcode.length != 0){
        this.postdata.broom = broomcode.join();
        this.tabdata[this.tabIndex].name = broomname.join();
        this.tabdata[this.tabIndex].selected = true;
      }else{
        this.postdata.broom = '';
        this.tabdata[this.tabIndex].name = '房型';
        this.tabdata[this.tabIndex].selected = false;
      }
      console.log(broomname);
      this.list = [];
      this.load = false;
      this.shadow = false;
      this.getListData();
      this.tabIndex = 4;
    },
    cancelBroom:function(){
      this.houseTag.map((item,index) => {
        this.houseTag[index].selected = false
      });
    }
  }
}