/*
* 直接更新state的多个方法的对象
* */
// import {
//   RECEIVE_ADDRESS,
//   RECEIVE_CATEGORYS,
//   RECEIVE_SHOPS,
// } from "mutation-types"
import Vue from "vue"
export default {
  //获取地址
  RECEIVE_ADDRESS(state,{address}){
    state.address = address;
  },

//获取食品分类列表
  RECEIVE_CATEGORYS(state,{categorys}){
    state.categorys = categorys;
  },
  //获取商家列表
  RECEIVE_SHOPS(state,{shop}){
    state.shops = shop;
  },
  //接收用户个人信息
  RECEIVE_USERINFO(state,{userInfo}){
    state.userInfo = userInfo;
  },
  //退出登陆时清空用户个人信息
  RESET_USER_INFO(state){
    state.userInfo = {};
  },
  //接收商品列表信息
  RECEIVE_GOODS(state,{goods}){
    state.goods = goods;
  },
  //接收用户评价信息
  RECEIVE_Ratings(state,{ratings}){
    state.ratings = ratings;
  },
  //接收商家详细信息
  RECEIVE_INFO(state,{info}){
    state.info = info;
  },
  //更新food数量(增加)
  ADD_FOOD_COUNT(state,{food}){
    if (!food.count) {
      Vue.set(food,"count",1);  //可以使得新增属性拥有数据绑定的效果
      state.cartFoods.push(food);
    }else {
      food.count++;
    }
  },
  //更新food数量(减少)
  DEC_FOOD_COUNT(state,{food}){
    if (food.count){
      food.count--;
      if (food.count ===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1);
      }
    }
  },
  //清空购物车
  CLEAR_CART(state){
    //清除购物车中的count
    state.cartFoods.forEach(cartFood=>{
      cartFood.count = 0;
    });
    //移除所有购物车中的列表
    state.cartFoods = [];
  }

}
