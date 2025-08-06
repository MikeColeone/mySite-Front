// src/stores/useUserStore.ts
import { create } from 'zustand'
import { getUserInfo } from '@/apis/user'
import { GET_TOKEN } from '@/utils/auth'
import type { UserInfo } from '@/apis/user'

// 定义用户状态接口
interface UserState {
  token: string | null
  userInfo: UserInfo | null
  getInfo: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  token: GET_TOKEN(),
  userInfo: null,

  getInfo: async () => {
    try {
      const res = await getUserInfo()
      if (res.code=== 200) {
        set({ userInfo: res.data })
      }
    } catch (err) {
      console.error('Failed to fetch user info:', err)
    }
  },
}))
