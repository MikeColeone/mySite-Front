import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { message, notification } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Jwt_Prefix } from '@/const/Jwt'
import { GET_TOKEN } from '@/utils/auth'
import useLoadingStore from '@/store/modules/useLoadingStore'
import { REQUEST_LOADING_PATH } from '@/utils/enum'

interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  __isRetryRequest?: boolean
}

interface ResponseData<T = any> {
  code: number
  data: T
  msg: string
}

// 创建axios实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

const env = import.meta.env
const pathRequestCount = new Map<string, number>()
const firstRequestPaths = new Set<string>()
let loadingShown = false

// 请求拦截器
http.interceptors.request.use((config: CustomAxiosConfig) => {
  const url = config.url
  
  // 特殊API路径处理
  if (url?.startsWith(import.meta.env.VITE_MUSIC_BASE_API)) {
    config.baseURL = ''
  }

  // 加载状态管理
  const matchingPath = REQUEST_LOADING_PATH.find(path => url?.startsWith(path))
  const isSpecialApi = url?.startsWith(env.VITE_YIYAN_API)

  if (!isSpecialApi || matchingPath) {
    if (matchingPath && !firstRequestPaths.has(matchingPath)) {
      firstRequestPaths.add(matchingPath)
      const currentCount = pathRequestCount.get(matchingPath) || 0
      pathRequestCount.set(matchingPath, currentCount + 1)
      
      if (!loadingShown) {
        loadingShown = true
        const loadingStore = useLoadingStore()
        loadingStore.show()
        NProgress.start()
      }
    } else {
      NProgress.start()
    }
  }

  // 添加通用请求头
  config.headers['X-Client-Type'] = 'Frontend'
  
  // 添加认证token
  const token = GET_TOKEN()
  if (token) {
    config.headers.Authorization = `${Jwt_Prefix}${token}`
  }

  return config
}, (error: AxiosError) => {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const url = response.config.url
    const matchingPath = REQUEST_LOADING_PATH.find(path => url?.startsWith(path))

    // 处理加载状态
    handleLoadingState(matchingPath)

    // 特定状态码处理
    if (response.data.code === 1012) {
      showAccountBannedNotification(response.data.msg)
    }

    return response.data
  },
  (error: AxiosError) => {
    const url = error.config?.url
    const matchingPath = url ? REQUEST_LOADING_PATH.find(path => url.startsWith(path)) : undefined
    
    // 处理加载状态
    handleLoadingState(matchingPath)

    // 错误处理
    if (!url?.startsWith('https://v1.hitokoto.cn')) {
      showErrorMessage(error)
    }

    return Promise.reject(error.response)
  }
)

// 辅助函数：处理加载状态
function handleLoadingState(matchingPath?: string) {
  if (matchingPath) {
    const currentCount = pathRequestCount.get(matchingPath) || 0
    pathRequestCount.set(matchingPath, currentCount - 1)

    if (pathRequestCount.get(matchingPath) === 0) {
      loadingShown = false
      const loadingStore = useLoadingStore()
      loadingStore.hide()
      pathRequestCount.delete(matchingPath)
      NProgress.done()
    }
  } else {
    NProgress.done()
  }
}

// 辅助函数：显示账号封禁通知
function showAccountBannedNotification(msg: string) {
  notification.warning({
    message: '账号已被封禁',
    description: msg,
    duration: 4.5
  })
}

// 辅助函数：显示错误消息
function showErrorMessage(error: AxiosError) {
  let errorMessage = error.message

  if (errorMessage === 'Network Error') {
    errorMessage = '后端接口连接异常'
  } else if (errorMessage.includes('timeout')) {
    errorMessage = '系统接口请求超时'
  } else if (errorMessage.includes('Request failed with status code')) {
    errorMessage = `系统接口${errorMessage.substring(errorMessage.length - 3)}异常`
  }

  message.error(errorMessage)
}

export default http