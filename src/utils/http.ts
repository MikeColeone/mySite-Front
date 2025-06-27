import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { message, notification } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Jwt_Prefix } from '@/const/Jwt';
import { GET_TOKEN } from './auth';
import useLoadingStore from '@/store/modules/loading';
import { REQUEST_LOADING_PATH } from '@/utils/enum';

// 创建axios实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/', // api的base_url
  timeout: 60000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

const env = import.meta.env;
const pathRequestCount = new Map<string, number>();
const firstRequestPaths = new Set<string>(); // 使用 Set 来记录已经请求过的路径
let loadingShown = false;

// 请求拦截器
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config?.url;
  
  // 处理特殊URL路径
  if (url?.startsWith(import.meta.env.VITE_MUSIC_BASE_API)) {
    config.baseURL = "";
  }

  // 检查是否需要显示加载状态
  const matchingPath = REQUEST_LOADING_PATH.find(path => url?.startsWith(path));
  const isSpecialApi = url?.startsWith(env.VITE_YIYAN_API);

  if (!isSpecialApi || matchingPath) {
    if (matchingPath && !firstRequestPaths.has(matchingPath)) {
      // 第一次请求特定路径时
      firstRequestPaths.add(matchingPath);
      pathRequestCount.set(matchingPath, (pathRequestCount.get(matchingPath) || 0) + 1);
      
      if (!loadingShown) {
        loadingShown = true;
        const loadingStore = useLoadingStore();
        loadingStore.show();
        NProgress.start();
      }
    } else {
      NProgress.start();
    }
  }

  // 添加通用请求头
  config.headers['X-Client-Type'] = 'Frontend';
  
  // 添加认证token
  const token = GET_TOKEN();
  if (token) {
    config.headers['Authorization'] = `${Jwt_Prefix}${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const url = response.config?.url;
    const matchingPath = REQUEST_LOADING_PATH.find(path => url?.startsWith(path));

    // 处理加载状态
    if (matchingPath) {
      const currentCount = pathRequestCount.get(matchingPath) || 0;
      pathRequestCount.set(matchingPath, currentCount - 1);

      if (pathRequestCount.get(matchingPath) === 0) {
        // 所有特定路径的请求都已完成
        loadingShown = false;
        const loadingStore = useLoadingStore();
        loadingStore.hide();
        pathRequestCount.delete(matchingPath);
        NProgress.done();
      }
    } else {
      NProgress.done();
    }

    // 处理特定响应码
    if (response.data.code === 1012) {
      notification.warning({
        message: '账号已被封禁',
        description: response.data.msg,
      });
    }

    return response.data;
  },
  (error: AxiosError) => {
    let errorMessage = error.message;
    
    // 处理不同类型的错误
    if (errorMessage === "Network Error") {
      errorMessage = "后端接口连接异常";
    } else if (errorMessage.includes("timeout")) {
      errorMessage = "系统接口请求超时";
    } else if (errorMessage.includes("Request failed with status code")) {
      errorMessage = `系统接口${errorMessage.substring(errorMessage.length - 3)}异常`;
    }

    // 不显示特定URL的错误
    if (!error?.config?.url?.startsWith("https://v1.hitokoto.cn")) {
      message.error(errorMessage);
    }

    return Promise.reject(error.response);
  }
);

export default http;