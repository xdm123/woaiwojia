<template>
  <div class="sale_wrap">
    <Head :title="title" :btn='true' @goback='goBack'></Head>
    <!-- 搜索&&tab -->
    <div class="sale_tab">
      <div class="sale_search_wrap">
        <div class="sale_search">
          <img src="../../../assets/img/resources/search-icon.png" alt="">
          <input type="text" placeholder="请输入小区或商圈名称">
        </div>
      </div>
      <ul class="sale_tab_ul">
        <li 
        v-for="(item,index) in tabdata"
        :key='index'
        @click="tabClick"
        :data-index='index'
        :class="(item.selected ? 'setColor' : (tabIndex == index ? 'setColor' : ''))"
        >
          {{item.name}}
          <span class="arrow"></span>
        </li>
      </ul>
    </div>
    <!-- 搜索&&tabEnd -->

    <!-- 列表数据 -->
    <div class="sale_list">
      <Bscroll :data='list' :pullup='true' @scrollToEnd='loadMore'>
        <Listdata :list='list' :listType='1'></Listdata>
      </Bscroll>
    </div>
    <!-- 列表数据End -->

    <Load v-if="!load"></Load>
    <p v-if="totalShow" class="sale_totle">共找到&nbsp;{{total}}&nbsp;套</p>

    <!-- 筛选条件 -->
    <div v-if="shadow" class="tabSelectBox" @click="hideShadow">
    </div>
    <!-- 筛选条件End -->
    <!-- 区域筛选 -->
    <div class="areaBox" v-if="tabIndex == 0">
      <ul class="area_leave_a">
        <li v-for="(item,index) in areaLeaveA" 
        :data-index='index'
        :class="areaLeaveAindex == index ? 'areaCur':''"
        @click.stop="areaLeaveAClick"
        :key="index">
          {{item}}
        </li>
      </ul>
      <div id="area_leave_b" ref="area_leave_b">
        <ul class="area_leave_b">
          <li @click.stop="LeaveBlimit"><p>不限</p></li>
          <li v-for="(item,index) in areaLeaveB" 
          :data-index='index'
          :data-id='areaLeaveAindex == 1 ? item.lineid : item.id'
          :key="item.id"
          :data-name='item.name'
          :class="areaLeaveBindex == index ? 'areaCur':''"
          @click.stop="areaLeaveBClick"
          >
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div 
      v-show="areaLeaveC.length != 0"
      id="area_leave_c" 
      ref="area_leave_c">
        <ul>
          <li 
          :class="areaLeaveCindex == 999 ? 'areaCur':''"
          @click.stop="LeaveClimit"
          :data-name='areaLeaveBname'
          ><p>不限</p></li>
          <li v-for="(item,index) in areaLeaveC" 
          :data-id='item.id'
          :data-lineid='item.lineid'
          :data-index='index'
          :data-name='item.name'
          :key="item.id"
          :class="areaLeaveCindex == index ? 'areaCur':''"
          @click.stop="LeaveCcLick"
          >
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 区域筛选End -->

    <!-- 价格筛选 -->
    <div class="priceBox" v-if="tabIndex == 1">
      <div class="price_wrap">
        <p class="zdy">自定义<span>(万)</span></p>
        <div class="input_price">
          <input 
          maxlength="5"
          v-model='minprice'
          type="text" placeholder='最低价'>
          <span>-</span>
          <input 
          maxlength="5"
          v-model='maxprice'
          type="text" placeholder='最高价'>
        </div>
        <ul>
          <li
          v-for="(item,index) in priceTag"
          :key='index'
          :data-name='item.name'
          :data-code='item.code'
          :data-index='index'
          :class='tagIndex == index ? "cur": ""'
          @click="choosePrice"
          >
            {{item.name}}
          </li>
        </ul>
        <div class="btn_wrap">
          <p class="cancel" @click.stop='cancelPrice'>清空</p>
          <p class="confirm" @click.stop='confirmPrice'>确定</p>
        </div>
      </div>
    </div>
    <!-- 价格筛选End -->

    <!-- 房型筛选 -->
    <div class="houseBox" v-if='tabIndex == 2'>
      <div class="house_wrap">
        <ul>
          <li
          v-for="(item,index) in houseTag"
          :key='index'
          :data-name='item.name'
          :data-broom='item.broom'
          :data-index='index'
          :class='houseTag[index].selected ? "cur": ""'
          @click="chooseBroom"
          >
            {{item.name}}
          </li>
        </ul>
        <div class="btn_wrap">
          <p class="cancel" @click.stop='cancelBroom'>清空</p>
          <p class="confirm" @click.stop='confirmBroom'>确定</p>
        </div>
      </div>
    </div>
    <!-- 房型筛选End -->

    <!-- 更多筛选 -->
    <div class="moreBox" v-if='tabIndex == 3'>

    </div>
    
  </div>
</template>

<script src='./sale.js'></script>

<style src='./sale.scss' scoped lang='scss'></style>