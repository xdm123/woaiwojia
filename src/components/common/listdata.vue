<template>
  <ul>
    <li v-for="(item,index) in list" :key='index'>
      <div class="rec_left">
        <img class='rec_house_pic' :src='item.imgurl' alt="">
        <span>{{item.housetag}}</span>
        <img class="icon_3d" src="../../assets/img/resources/icon3d.png" alt="">
      </div>
      <div class="rec_right">
        <p class='rec_house_name'>{{item.housetitle}}</p>
        <p class="rec_house_info">
          <span v-if="listType === 1 ? true : false">{{item.bedroom + '室' + item.livingroom + '厅' + item.toilet + '卫'}}</span>
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
          <span>{{item.unitprice}}元/㎡</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props:{
    list:{
      default:[]
    },
    listType:{
      default:1 //1二手房列表
    }
  }
}
</script>

<style>
.sale_list li{
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