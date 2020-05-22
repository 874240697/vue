<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification"
                      :class="{right_phone:rightPhone}" @click.prevent.stop="getCode">
                {{computeTime > -1 ? `已发送(${computeTime}s)` : "获取验证码"}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>

          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="16" placeholder="密码" v-if="!isShow" v-model="pwd">
                <input type="text" maxlength="16" placeholder="密码" v-if="isShow" v-model="pwd">
                <div class="switch_button" :class="isShow? 'on' :'off'" @click="changePwd">
                  <div class="switch_circle" :class="{right:isRight}"></div>
                  <span class="switch_text">{{isShow? "显示" :""}}</span>
                </div>
                <!--                <i class="iconfont icon-biyan"></i>-->
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="index://localhost:4000/captcha"
                     alt="captcha" @click="changeCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-right"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="isAlert" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
  import AlertTip from "../../components/AlertTip/AlertTip"
  import {reqLoginSms,reqLoginPwd,reqSendCode} from  "../../api"
  export default {
    data() {
      return {
        loginWay: true,  //true代表短信登陆 false代表账号密码登陆
        phone: '', //手机号
        computeTime: -1, //计时时间
        isShow: false, //是否显示密码
        pwd: "", //密码
        isRight: false,
        code: "", //短信验证码
        name: "", //用户名
        captcha: "", //一次性验证码
        isAlert: false, //是否显示提示框
        alertText: '',  //提示文本
      }
    },
    computed: {
      rightPhone() {
        return /^1\d{10}/.test(this.phone);
      },
    },
    methods: {
      //异步获取短信验证码
      async getCode() {

        //倒计时显示
        //如果没有计时的时候开始执行
        if (this.computeTime === -1) {
          this.computeTime = 10;
          this.time = setInterval(() => {
            this.computeTime--;
            if (this.computeTime === -1) {
              clearInterval(this.time);
            }
          }, 1000);
          //发送ajax请求
          const result = await reqSendCode(this.phone);
          if (result.code ===1){
            //显示提示
            this.showAlert(result.msg);
            //停止计时(先判断是否还在计时)
            if (this.computeTime>-1){
              this.computeTime = -1;
              clearInterval(this.time);
              this.time = null;
            }
          }
        }
      },
      //显示提示框组件
      showAlert(alertText) {
        this.isAlert = true;
        this.alertText = alertText;
      },
      //异步登陆
      async login() {
        let result;
        //前台表单验证
        //1、先判断是哪种登陆方式
        if (this.loginWay) { //如果是短信登陆登陆方式
          const {rightPhone, phone, code} = this;
          if (!rightPhone) {
            //手机号不正确
            this.showAlert("手机号不正确");
          } else if (!/^\d{6}$/.test(code)) {
            //验证码不正确
            this.showAlert("验证码不正确");
          }
          //发送ajax请求短信登陆
           result = await reqLoginSms(phone,code);

        } else { //账号密码登陆
          const {name, pwd, captcha} = this;
          if (!name) {
            //必须指定用户名
            this.showAlert("必须指定用户名");
          } else if (!pwd) {
            //必须指定密码
            this.showAlert("必须指定密码");
          } else if (!captcha) {
            //必须指定验证码
            this.showAlert("必须指定验证码");
          }
          //发送ajax请求账号密码登陆
           result = await reqLoginPwd({name, pwd, captcha});

        }
        //停止计时
        if (this.computeTime>-1){
          this.computeTime = -1;
          clearInterval(this.time);
          this.time = null;
        }
        //根据结果数据来处理
        if (result.code === 0){ //请求如果成功了...
          const user = result.data;
          //将user保存到vuex中的state中
          this.$store.dispatch("saveUser",user);
          //跳转路由
          this.$router.replace('/profile');
        } else { //请求如果失败了...
          this.changeCaptcha();
          this.name = '';
          this.pwd = '';
          this.phone = '';
          this.showAlert(result.msg);
        }


      },
      //是否显示密码
      changePwd() {
        this.isShow = !this.isShow;
        this.isRight = !this.isRight;
      },
      //关闭验证提示框
      closeTip() {
        this.isAlert = false;
      },
      //获取新的图片验证码
      changeCaptcha() {
        //每次指定的src路径都不一样
        this.$refs.captcha.src = "index://localhost:4000/captcha?time=" + Date.now();
      }
    },
    components: {
      AlertTip
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff

    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto

      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774

      .login_content
        > form
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #02a774

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

                &.right_phone
                  color black

            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)

                &.off
                  background #fff

                  .switch_text
                    float right
                    color #ddd

                &.on
                  background #02a774

                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s

                  &.right
                    transform translateX(27px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px

              > a
                color #02a774

          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0

        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999

      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px

        > .iconfont
          font-size 20px
          color #999
</style>
