import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//定义数据
    tableData: [],
    editData: {}
  },
  mutations: {// 生成vuex所管理的可分发全局引用数据
    FETCH_HOME_DATA(state, payload) {
      state.tableData = payload;
    },
  },
  actions: { // 引入数据源
    FETCH_TABLE_DATA({ commit }) {
      axios.get('http://api.baxiaobu.com/index.php/home/v5/findUser')
        .then(res => {
          commit('FETCH_HOME_DATA', res.data.users)//调用全局管理数据
        })
    },
    FETCH_TABLE_ADD(context, action) {// 表格添加
      axios.post('https://api.baxiaobu.com/index.php/home/v5/add', qs.stringify(action))
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch("FETCH_TABLE_ADD");
          }
        });
    },
    FETCH_TABLE_DELETE(context, action) {//表格删除
      axios.post('https://api.baxiaobu.com/index.php/home/v5/deleteUser', qs.stringify({ id: action }))
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch('FETCH_TABLE_DATA');
          }
        })
    },
    FETCH_TABLE_EDIT(context, action) {//表格修改
      axios.post('http://api.baxiaobu.com/index.php/home/v5/updateUser',
        qs.stringify({ id: action.id, name: action.name, msg: action.msg }))
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch('FETCH_TABLE_EDIT')
          }
        })
    },
    //  调用搜索接口
    FETCH_ACTION_SEARCH(context, payload) {
      axios
        .get(
          "https://api.baxiaobu.com/index.php/home/v5/findUser?keyword=" +
          payload
        )
        .then((res) => {
          context.commit("FETCH_HOME_DATA", res.data.users);
        });
    },
  },
  modules: {
  }
})
