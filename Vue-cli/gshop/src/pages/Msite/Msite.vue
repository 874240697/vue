<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
     <router-link class="header_search" slot="left" to="/search">
       <i class="iconfont icon-chazhao"></i>
     </router-link>
      <router-link class="header_login" slot="right" :to="userInfo.name? '/userInfo' : '/login'">
        <i class="iconfont icon-wo" v-show="userInfo.name"></i>
      <span class="header_login_text">{{userInfo.name || "登陆/注册"}}</span>

     </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg"  alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
  //首页组件vue
  import {mapState} from "vuex"
  import HeaderTop from "../../components/HeaderTop/HeaderTop"
  import Swiper from "swiper"
  import "swiper/css/swiper.min.css"
  import ShopList from "../../components/ShopList/ShopList"
  export default {
    data() {
      return {
        baseImgUrl: "https://fuss10.elemecdn.com"
      }
    },
    mounted() {
      //异步发送请求获取商品列表
      this.$store.dispatch("getCategorys");
    },
    components: {
      HeaderTop,
      ShopList
    },
    computed: {
      ...mapState(["address", "categorys","userInfo"]),
      categorysArr() {
        const {categorys} = this;
        //准备一个二维数组
        let arr = [];
        let minArr = [];
        //遍历categorys
        categorys.forEach(category => {
          //如果小数组长度为8，就清空小数组，
          if (minArr.length === 8) {
            minArr = [];
          }
          //如果小数组是空的，就push进大叔组arr中
          if (minArr.length === 0) {
            arr.push(minArr);
          }
          //小数组长度小于8时，将category保存到minArr小数组中
          minArr.push(category);
        });
        return arr;
      }
    },
    watch:{
      categorys(value){ //categorys数组中有数据了，在异步更新界面之前执行
            //可以使用setTimeout方法，但不太好，不确定具体时间
            //使用$nextTick(一旦数据更新，立即调用)
        this.$nextTick(()=>{
          //创建一个Swiper实例对象，实现轮播
          //必须创建在显示列表之前
          new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            pagination: {
              el: '.swiper-pagination',
            },
          });
        });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999

    &.on
      color #02a774

    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px

      .iconfont
        font-size 22px

  //123
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774

  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff

    .shop_header
      padding 10px 10px 0

      .shop_icon
        margin-left 5px
        color #999

      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
