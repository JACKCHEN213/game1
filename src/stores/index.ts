// 引入defineStore用于创建store
import { defineStore } from 'pinia';

// 定义并暴露一个store
export const useDefaultStore = defineStore('character', {
  // 动作
  actions: {},
  // 状态
  state() {
    return {
      select_flag: false,
      show_menu_flag: false,
      current_character_id: '',
      move_grid_range_list: [] as any[],
      attack_grid_range_list: [] as any[],
    };
  },
  // 计算
  getters: {},
});
