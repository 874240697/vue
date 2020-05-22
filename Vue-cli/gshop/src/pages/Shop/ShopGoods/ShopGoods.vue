<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--current-->
          <li class="menu-item " v-for="(good,index) in goods" :key="index"
              :class="{current:index === currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px" style="font-size: 12px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUI">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                      <CartControl :food = "food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import BScroll from "better-scroll"
  import CartControl from "../../../components/CartControl/CartControl"
  import Food from "../../../components/Food/Food"
  import ShopCart from "../../../components/ShopCart/ShopCart"
  export default {
    data() {
      return {
        scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
        tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
        food:{}, //存储需要显示的food
      }
    },
    mounted() {
      //方法二: 利用dispatch传递一个回调函数实现数据更新后立马创建BScroll
      this.$store.dispatch("getShopGoods", () => {
        this._initScroll();
        this._initTops();
      });
    },
    //computed什么时候执行？ 1、初始化的时候执行  2、相关数据变化的时候执行
    computed: {
      ...mapState(["goods"]),
      //计算得到当前分类下标
      currentIndex() {
        let index = 0;
        for (let i = 0; i < this.tops.length; i++) {
          if (this.scrollY >= this.tops[i] && this.scrollY < this.tops[i + 1]) {
            index = i;
          }
        }
        return index;
      }

    },
    methods: {
      //初始化滚动
      _initScroll() {
        this.$nextTick(() => {
          new BScroll(".menu-wrapper",{
            click:true
          });
          this.foodScroll = new BScroll(".foods-wrapper", {
            probeType: 2,  //0 1 2 3  四个值(什么时候派发scroll事件)
            click:true
          });
          //给右侧列表绑定scroll监听
          this.foodScroll.on("scroll", ({x, y}) => {
            this.scrollY = Math.abs(y);
          });
          //scrollEnd参数：{Object} {x, y} 滚动结束的位置坐标
          //触发时机：滚动结束
          this.foodScroll.on("scrollEnd",({x,y})=>{
            this.scrollY = Math.abs(y);
          })
        })
      },
      //收集tops
      _initTops() {
        //1、初始化tops
        let tops = [];
        let top = 0;
        tops.push(top);
        //2、找到对应的li
        const list = this.$refs.foodsUI.getElementsByClassName("food-list-hook");
        Array.prototype.slice.call(list).forEach(li => {
          top += li.clientHeight;
          tops.push(top);
        });
        //3、更新数据tops
        this.tops = tops;
        console.log(tops)
      },
      clickMenuItem(index){
        //先得到目标位置scrollY，立即更新scrollY
        this.scrollY = this.tops[index];
        //scrollTo滚动到具体位置，参数一二：x,y轴坐标，参数三：滚动到位置需要的过度时间
        this.foodScroll.scrollTo(0,-this.scrollY,300,)
      },
      //点击显示food
      showFood(food){
        //设置food
        this.food = food;
        //显示food组件中的toggleShow方法(调用子组件的方法)
        this.$refs.food.toggleShow();
      }
    },

    components:{
      CartControl,
      Food,
      ShopCart
    }
    //方法一: watch与$nextTick方法实现数据更新后立马创建BScroll
    // watch:{
    //   goods(value){
    //     this.$nextTick(()=>{
    //       new BScroll(".menu-wrapper");
    //     })
    //   }
    // }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      touch-action: pan-y;

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700

          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1
      touch-action: pan-y;

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        /*bottom-border-1px(rgba(7, 17, 27, 0.1))*/

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1
          position relative
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0px
            bottom -20px


  //
  .bottom-border-1px {
    border-bottom 1px solid rgba(7, 17, 27, 0.1);
  }

</style>
