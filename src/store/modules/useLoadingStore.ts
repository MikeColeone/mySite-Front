import { create } from 'zustand'

// 创建 Zustand store，管理全局 loading 状态
const useLoadingStore = create((set) => ({
  isLoading: false, // 初始状态，false

  // 显示 loading，禁用页面滚动
  show: () => {
    document.body.style.overflow = 'hidden' // 禁止滚动
    set({ isLoading: true }) // 状态改为 true
  },

  // 隐藏 loading，恢复页面滚动
  hide: () => {
    document.body.style.overflow = '' // 恢复滚动
    set({ isLoading: false }) // 状态改为 false
  }
}))

export default useLoadingStore
