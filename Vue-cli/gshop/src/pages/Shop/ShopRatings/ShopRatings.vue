<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36"/>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36"/>
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" @click="setSelectType(2)" :class="{active:selectType === 2}">
            全部<span class="count">{{ratings.length}}</span>
          </span>
          <span class="block positive " @click="setSelectType(0)" :class="{active:selectType === 0}">
            满意<span class="count">{{satisfaction}}</span>
          </span>
          <span class="block negative " @click="setSelectType(1)" :class="{active:selectType === 1}">
            不满意<span class="count">{{ratings.length  - satisfaction}}</span>
          </span>
        </div>
        <div class="switch " @click="isShowContent"
             :class="isShowText? 'on' : ''">
          <span class="iconfont icon-Icon-CheckCircle-Rounded"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24"/>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont " :class="rating.rateType === 0? 'icon-thumbup' :'icon-thumbdown'"></span>
                <span class="item" v-for="(recommend,index) in rating.recommend" :key="index">{{recommend}}</span>
              </div>
              <div class="time">{{rating.rateTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import Star from "../../../components/Star/Star"
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        isShowText: true, //是否只看有文本的内容
        selectType: 2 // 0满意  1不满意  2全部
      }
    },
    mounted() {
      this.$store.dispatch("getShopRatings", () => {
        this.$nextTick(() => {
          new BScroll(".ratings", {
            click: true
          })
        })
      });
    },
    components: {
      Star
    },
    computed: {
      ...mapState(["info", "ratings"]),
      satisfaction() {
        let sum = 0;
        for (let i = 0; i < this.ratings.length; i++) {
          if (this.ratings[i].rateType === 0) {
            sum++;
          }
        }
        return sum;
      },
      filterRatings() {
        const {isShowText, ratings, selectType} = this;
        //产生一个过滤新数组
        return ratings.filter(rating => {
          const {rateType, text} = rating;
          /*
          条件一:
            selectType: 0/1/2
            rateType: 0/1
            selectType === 2 || rateType === selectType

          条件二:
            isShowText: true/false
            text: 是否有值
            !isShowText || text.length>0
           */
          return (selectType === 2 || selectType === rateType) && (!isShowText || text.length > 0);
        })
      }
    },
    methods: {
      isShowContent() {
        this.isShowText = !this.isShowText;
      },
      setSelectType(type) {
        this.selectType = type
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff

    .overview
      display: flex
      padding: 18px 0

      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px

        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)

        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)

        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)

      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px

        .score-wrapper
          margin-bottom: 8px
          font-size: 0

          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)

          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top

          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)

        .delivery-wrapper
          font-size: 0

          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)

          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)

    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7

    .ratingselect
      .rating-type
        padding: 18px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0

        .block
          display: inline-block
          padding: 8px 12px
          margin-right: 8px
          line-height: 16px
          border-radius: 1px
          font-size: 12px
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)

          &.active
            background: $green
            color: #fff

          .count
            margin-left: 2px
            font-size: 8px

      .switch
        padding: 12px 18px
        line-height: 24px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0

        &.on
          .icon-Icon-CheckCircle-Rounded
            color: $green

        .icon-Icon-CheckCircle-Rounded
          display: inline-block
          vertical-align: top
          margin-right: 4px
          font-size: 24px

        .text
          display: inline-block
          vertical-align: top
          font-size: 12px

    .rating-wrapper
      padding: 0 18px

      .rating-item
        display: flex
        padding: 18px 0
        /*bottom-border-1px(rgba(7, 17, 27, 0.1))*/

        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px

          img
            border-radius: 50%

        .content
          position: relative
          flex: 1

          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)

          .star-wrapper
            margin-bottom: 6px
            font-size: 0

            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top

            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)

          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px

          .recommend
            line-height: 16px
            font-size: 0

            .icon-thumbup, .icon-thumbdown, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px

            .icon-thumbup
              color: $yellow

            .icon-thumbdown
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff

          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
