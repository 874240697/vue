<template>
  <div>
    <div class="box" :class="{'on':isShow}">
      <h2>狼人杀</h2>
      <div>
        <span>用户名</span>
        <input id="user" placeholder="请输入用户"></input>
      </div>
      <div>
        <span>房间号</span>
        <input id="room" placeholder="请输入密码"></input>
      </div>
      <button @click="login" class="comeIn">进入游戏</button>
      <div class="gameRule" @click="showRule">游戏规则说明</div>
    </div>
    <div v-show="isShow" class="rule">
      <h2>狼人杀游戏规则</h2>
      <div class="ruleIn">
        <div>
          <h4>角色</h4>
          <p>预言家、猎人、女巫、村民、狼人</p>
        </div>
        <div>
          <h4>预言家</h4>
          <p>每天晚上可以询问上帝场上任意一张活人的身份牌的好坏，上帝会告诉他这个人是好人还是坏人(狼人)。</p>
        </div>
        <div>
          <h4>猎人</h4>
          <p>猎人在死后可以发动技能带走场上任何一个人(前提不是被女巫毒死的，其他的都可以发动技能)，猎人也可以不发动技能。</p>
        </div>
        <div>
          <h4>女巫</h4>
          <p>
            女巫有一瓶毒药和解药；女巫一天晚上可以用两瓶药，女巫用过解药过后就再也不知道今晚谁死了；
            晚上被女巫毒死的玩家白天没有遗言，被女巫毒死的猎人无法发动技能；
          </p>
        </div>
        <div>
          <h4>村民</h4>
          <p>没有任何功能的普通玩家。</p>
        </div>
        <div>
          <h4>狼人</h4>
          <p>晚上的时候身份牌为狼人的玩家可以选择刀一个人，但是要所有狼同伴都统一意见，
            如果意见不统一则上帝判定狼人没有刀人，当晚上帝在询问女巫的时候就会跟女巫说今晚没有人死亡。
          </p>
          <p>
            狼人有自爆的功能，狼人可以在游戏的任何阶段通知上帝自爆，(自爆就是跟所有人摊牌说自己是狼人，
            身份牌将会展示给所有人)，自爆后，游戏的任意阶段都会立刻中止并且直接进入天黑。
          </p>
        </div>
        <h3>胜利条件</h3>
        <div>
            <p>场上一共分为：神牌(好人)、平民（好人）、狼人（坏人）</p>
            <p>好人胜利条件：场上不存在任何一只狼人，并且保证场上既有神牌存在也有平民存在。</p>
            <p>狼人胜利条件：场上平民全死或者神全死，如果是在天黑阶段平民全死或者神全死，那么天亮后不管狼人是否还存活都判断狼人胜利。</p>
        </div>
      </div>

      <div class="back" @click="back">返回</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isShow:false
      }
    },
    methods: {
      login() {
        this.$router.push('/homepage')
      },
      showRule(){
        this.isShow = !this.isShow;

      },
      back(){
        this.isShow = !this.isShow;
      }
    }
  }
</script>

<style scoped>
  .ruleIn {
    width: 100%;
    position: absolute;
    left: 0;
  }
  .rule{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

  }
.on{
  display: none;
}
  ul{
    list-style-type: none;
  }
  li{
    padding-top: 10px;
  }
  p{
    text-indent: 2em;
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
  }
  .back{
    position: absolute;
    top: 10px;
    left: 5px;
  }
</style>
