import create from 'zustand'

// 创建 Zustand store，类似 Pinia 实例
const useStore = create((set) => ({
  // 示例状态
  count: 0,
  // 示例方法，类似 Pinia actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}))

export default useStore
