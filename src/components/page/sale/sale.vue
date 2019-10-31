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
        :class="tabIndex == index ? 'setColor' : ''"
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
    <div v-if="shadow" class="tabSelectBox">
      <!-- 区域筛选 -->
      <div class="areaBox" v-if="tabIndex == 0">
        <ul class="area_leave_a">
          <li v-for="(item,index) in areaLeaveA" 
          :data-index='index'
          :class="areaLeaveAindex == index ? 'areaCur':''"
          @click="areaLeaveAClick"
          :key="index">
            {{item}}
          </li>
        </ul>
        <div id="area_leave_b" ref="area_leave_b">
          <ul class="area_leave_b">
            <li><p>不限</p></li>
            <li v-for="(item,index) in areaLeaveB" 
            :data-index='index'
            :data-id='areaLeaveAindex == 1 ? item.lineid : item.id'
            :key="item.id"
            :class="areaLeaveBindex == index ? 'areaCur':''"
            @click="areaLeaveBClick"
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
            <li><p>不限</p></li>
            <li v-for="item in areaLeaveC" 
            :key="item.id"
            >
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 筛选条件End -->
  </div>
</template>

<script src='./sale.js'></script>

<style src='./sale.scss' scoped lang='scss'></style>