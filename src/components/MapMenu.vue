<script setup lang="ts">
  import { ref } from 'vue';
  import $t from '@/utils/i18n';

  const menuTypeEnum = ref<{ menuType: number; menuName: string }[]>([
    {
      menuType: 1,
      menuName: $t('menu.team'),
    },
    {
      menuType: 2,
      menuName: $t('menu.over'),
    },
    {
      menuType: 3,
      menuName: $t('menu.interrupt'),
    },
    {
      menuType: 4,
      menuName: $t('menu.save'),
    },
    {
      menuType: 5,
      menuName: $t('menu.load'),
    },
    {
      menuType: 6,
      menuName: $t('menu.environment'),
    },
    {
      menuType: 7,
      menuName: $t('menu.menu'),
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
    width: 40px;
    height: 95px;
    padding: 0;
    padding: 5px;
    border-radius: 5px;
    background-color: #87ceebdd;
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
