// 引入defineStore用于创建store
import { defineStore } from 'pinia';

// 定义并暴露一个store
export const useHumanStore = defineStore('human', {
  // 动作
  actions: {},
  // 状态
  state() {
    return {
      select_human_flag: true,
    };
  },
  // 计算
  getters: {},
});
