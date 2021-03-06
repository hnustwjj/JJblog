import { Module } from 'vuex'
import { IArticleState } from '@/store/article/types'
import { getArticleList } from '@/service/article'
import { IRootState } from '../types'
//第一个泛型是指定当前模块的state的类型，第二个泛型是指定根store的类型
const module: Module<IArticleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      articleList: [],
      allCount: 0
    }
  },
  actions: {
    //获取到数据之后修改state内容
    async getDataList({ commit }, payload) {
      const res = await getArticleList(payload)
      commit('changeArticleList', res.data?.list)
      commit('changeAllcount', res.data?.allCount)
      return res
    }
  },
  mutations: {
    changeArticleList(state, data) {
      state.articleList = data
    },
    changeAllcount(state, data) {
      state.allCount = data
    }
  }
}
export default module
