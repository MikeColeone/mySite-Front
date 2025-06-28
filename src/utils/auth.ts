// src/utils/auth.ts
import { TOKEN_KEY } from '@/const/Jwt';
import { message } from 'antd';
import {useUserStore} from '@/store/modules/user';

interface AuthData {
  token: string;
  expire: string;
}

/**
 * 获取存储中的认证token
 * @returns {string | null} 有效的token或null
 */
export const GET_TOKEN = (): string | null => {
  try {
    // 尝试从存储中获取token数据
    const storage = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (!storage) return null;

    // 解析存储数据
    const authData: AuthData = JSON.parse(storage);
    
    // 验证token有效期
    if (new Date(authData.expire) <= new Date()) {
      REMOVE_TOKEN();
      message.warning('登录状态已过期，请重新登录');
      return null;
    }

    return authData.token;
  } catch (error) {
    console.error('获取token失败:', error);
    REMOVE_TOKEN();
    return null;
  }
};

/**
 * 设置认证token
 * @param {string} token - JWT token
 * @param {string} expire - 过期时间
 * @param {boolean} remember - 是否持久化存储
 */
export const SET_TOKEN = (token: string, expire: string, remember: boolean): void => {
  try {
    const userStore = useUserStore();
    const authData: AuthData = { token, expire };
    
    // 根据remember选择存储方式
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, JSON.stringify(authData));
    
    // 更新store中的token状态
    userStore.setToken(token);
  } catch (error) {
    console.error('设置token失败:', error);
    throw new Error('Token存储失败');
  }
};

/**
 * 移除存储中的认证token
 */
export const REMOVE_TOKEN = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    
    // 可选：清除store中的token状态
    const userStore = useUserStore();
    userStore.clearToken();
  } catch (error) {
    console.error('移除token失败:', error);
  }
};