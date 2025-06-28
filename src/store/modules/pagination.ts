import { defineStore } from 'pinia';

let usePaginationStore = defineStore('pagination', {
  state: () => ({
    // 文章分页
    articlePagination: {
      current: 1,   // 当前页
      pageSize: 10, // 每页条数
      total: 0,     // 总条数
    }
  }),
});

export default usePaginationStore;
