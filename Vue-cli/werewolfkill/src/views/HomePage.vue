<template>
  <div>
    <div class="btn" v-show="isBtnShow">
      <div class="createBtn">
        <button @click="isCreateRooms">创建房间</button>
      </div>
      <div class="joinBtn">
        <button @click="isAddRooms">加入房间</button>
      </div>

    </div>
    <div class="shade" v-show="isAddRoom || isCreateRoom">
      <!--显示创建房间界面-->
      <div v-show="isCreateRoom" class="createRoom">
        <span>房间号</span>
        <input></input>
        <button @click="createRoom">创建</button>
        <button @click="cancelCreate">取消</button>
        <div class="personSum">
          <div class="Person1">6人</div>
          <div class="Person2">8人</div>
          <div class="Person3">10人</div>
        </div>
      </div>
      <!--显示加入房间界面-->
      <div v-show="isAddRoom" class="addRoom">
        <span>房间号</span>
        <input></input>
        <button @click="comeIn">进入</button>
        <button @click="cancelIn">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isAddRoom: false,
        isCreateRoom: false,
        isBtnShow:true
      }
    },
    methods: {
      //创建房间并进入
      createRoom() {
        this.isCreateRoom = false;
        this.isBtnShow = true
      },
      //取消创建
      cancelCreate() {
        this.isCreateRoom = false;
        this.isBtnShow = true
      },
      //加入房间
      comeIn() {
        this.isAddRoom = false;
        this.isBtnShow = true
      },
      //取消加入
      cancelIn() {
        this.isAddRoom = false;
        this.isBtnShow = true
      },
      isCreateRooms(){
        this.isCreateRoom = !this.isCreateRoom;
        this.isBtnShow = !this.isBtnShow
      },
      isAddRooms(){
        this.isAddRoom = !this.isAddRoom;
        this.isBtnShow = !this.isBtnShow
      }
    },
  }
</script>

<style scoped>
  .personSum{
    width: 150px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-80px) translateX(-75px);
  }
  .Person1{
    text-align: center;
    width: 150px;
    background: blue;
    opacity: 0.8;
    margin-top: 10px;
  }
  .Person2{
    margin-top: 10px;
    text-align: center;
    width: 150px;
    background: green;
    opacity: 0.8;
  }
  .Person3{
    margin-top: 10px;
    text-align: center;
    width: 150px;
    background: red;
    opacity: 0.8;
  }
  .shade {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(7, 17, 27, 0.5);
    z-index: 10;
  }

  .createRoom, .addRoom {
    width: 375px;
    height: 300px;
    z-index: 100;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-150px) translateX(-187px);
  }
  .btn{
    height: 300px;
    width: 375px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-150px) translateX(-187px);
  }
  .createBtn{
    height: 100px;
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-100px) translateY(-50px);
  }
  .joinBtn{
    height: 100px;
    width: 200px;
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-100px) translateY(-50px);
  }
</style>
