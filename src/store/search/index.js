import { reqSearchList } from '@/api'


const state = {
  searchList: {}
};


const actions = {
  async getSearchList({ commit }, data) {
    let result = await reqSearchList(data);

    if (result.code === 200) {
      console.log(result.data);
      commit("GETSEARCHLIST", result.data);
    }
  }
};

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};

const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  tradeMarkList(state) {
    return state.searchList.trademarkList || [];

  },
  attrsList(state) {
    return state.searchList.arrtsList || [];
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}