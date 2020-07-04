import Vuex from "vuex"
import Vue from 'vue'
Vue.use(Vuex);
import state from '../store/state'
import actions from '../store/actions'
import mutations from '../store/mutations'

export default new Vuex.Store({
  state,
  actions,
  mutations
})
