
//actions
/*
* 间接mutations更新state的多个方法的对象
* */
// import {
//   RECEIVE_ADDRESS,
//   RECEIVE_CATEGORYS,
//   RECEIVE_SHOPS,
// } from "mutation-types"
import {
  reqAddress,
  reqFoodCategorys,
  reqLogut,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqShops,
  reqUserInfo
} from "../api"

export default {
  //异步获取地址
  async getAddress({commit, state}) {
    //发送异步ajax请求
    const geohash = state.latitude + "," + state.longitude;
    const result = await reqAddress(geohash);
    //提交一个mutation
    if (result.code === 0) {
      const address = result.data;
      commit('RECEIVE_ADDRESS', {address})
    }
  },
  //异步获取食品分类列表
  async getCategorys({commit}) {
    //发送异步ajax请求
    const result = await reqFoodCategorys();
    //提交一个mutation
    if (result.code === 0) {
      const categorys = result.data;
      commit('RECEIVE_CATEGORYS', {categorys})
    }
  },
  //异步获取商家列表
  async getShops({commit, state}) {
    //发送异步ajax请求
    const result = await reqShops(state.latitude, state.longitude);
    //提交一个mutation
    if (result.code === 0) {
      const shop = result.data;
      commit('RECEIVE_SHOPS', {shop})
    }
  },
  //同步记录用户信息
  saveUser({commit}, userInfo) {
    commit("RECEIVE_USERINFO", {userInfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo();
    if (result.code === 0) {
      const userInfo = result.data;
      commit("RECEIVE_USERINFO", {userInfo})
    }

  },
  //异步请求退出登录
  async logout({commit}) {
    const result = await reqLogut();
    if (result.code === 0) {
      commit("RESET_USER_INFO")
    }
  },

  //异步请求商品列表
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods();
    if (result.code === 0) {
      const goods = result.data;
      commit("RECEIVE_GOODS", {goods});
      callback && callback();
    }
  },
  //异步请求用户评价
  async getShopRatings({commit},callback) {
    const result = await reqShopRatings();
    if (result.code === 0) {
      const ratings = result.data;
      commit("RECEIVE_Ratings", {ratings});
      callback && callback();
    }
  },
  //异步请求商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      const info = result.data;
      commit("RECEIVE_INFO", {info});
    }
  },

  //同步更新food的数量
  updateFoodCount({commit},{isAdd,food}){
    if (isAdd){
      commit("ADD_FOOD_COUNT",{food})
    } else {
      commit("DEC_FOOD_COUNT",{food})
    }
  },
  //清空购物车
  clearCart({commit}){
    commit("CLEAR_CART");
  }
}
