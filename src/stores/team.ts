// 引入defineStore用于创建store
import { defineStore } from 'pinia';
import { type ICharacter } from '@/types/character';

// 定义并暴露一个store
export const useTeamStore = defineStore('team', {
  // 动作
  actions: {
    getCharacterById(id: string): ICharacter | null | undefined {
      return this.character_list.find((character) => character.id === id);
    },
  },
  // 状态
  state() {
    return {
      character_list: [] as ICharacter[],
    };
  },
  // 计算
  getters: {},
});
