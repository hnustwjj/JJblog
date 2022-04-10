//统一出口
import { wjjRequest } from '@/service/request'
//封装的localStorage
import { ref } from 'vue'
const isLoading = ref(false)
//创建axios实例
let timer: any = null
const request_util = new wjjRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  interceptor: {
    requestOnFulfilled(config) {
      isLoading.value = true
      return config
    },
    responseOnFulfilled(res) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        isLoading.value = false
      }, 1000)
      return res.data
    }
  },
  timeout: 100000
})
export { request_util, isLoading }
