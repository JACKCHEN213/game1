<script setup lang="ts">
  import { ref } from 'vue';

  const menuTypeEnum = ref<{ menuType: number; menuName: string }[]>([
    {
      menuType: 1,
      menuName: '队伍',
    },
    {
      menuType: 2,
      menuName: '结束回合',
    },
    {
      menuType: 3,
      menuName: '中断',
    },
    {
      menuType: 4,
      menuName: '保存进度',
    },
    {
      menuType: 5,
      menuName: '环境设置',
    },
    {
      menuType: 6,
      menuName: '返回主菜单',
    },
  ]);

  function clickMenuItem(menuType: number, ev: MouseEvent) {
    ev.stopPropagation();
    console.log(menuType);
  }
</script>

<template>
  <div class="mapMenuWrapper" @click.stop>
    <ul class="mapMenu">
      <li
        v-for="(menuInfo, index) in menuTypeEnum"
        :key="index"
        class="mapMenuItem"
        @click="clickMenuItem(menuInfo.menuType, $event)"
      >
        {{ menuInfo.menuName }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .mapMenuWrapper {
    position: absolute;
    z-index: var(--z-index-map-menu-shadow);
    width: 100%;
    height: 100%;
  }

  .mapMenu {
    position: absolute;
    z-index: var(--z-index-map-menu);
    top: 20px;
    left: 100px;
    width: 60px;
    height: 100px;
    padding: 0;
    padding: 5px;
    border-radius: 5px;
    background-color: skyblue;
    color: white;
    font-size: 8px;
    list-style: none;
  }

  .mapMenuItem {
    display: flex;
    height: 12px;
    margin-bottom: 2px;
    padding-left: 2px;
    border-radius: 2px;
    line-height: 12px;
    cursor: pointer;
  }

  .mapMenuItem:hover {
    background-color: rgb(0 0 0 / 50%);
    color: yellow;
  }
</style>
