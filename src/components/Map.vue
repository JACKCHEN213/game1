<script lang="ts" setup>
  const { mapUrl, mapWidth, mapHeight, mapOffsetX, mapOffsetY } = defineProps({
    mapUrl: {
      type: String,
      required: true,
    },
    mapWidth: {
      type: Number,
      required: true,
    },
    mapHeight: {
      type: Number,
      required: true,
    },
    mapOffsetX: {
      type: Number,
      default: 0,
    },
    mapOffsetY: {
      type: Number,
      default: 0,
    },
  });

  import Cursor from './Cursor.vue';
  import Character from './Character.vue';
  import MapMenu from './MapMenu.vue';
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useGridMovement } from '@/hooks/useGridMovement';
  import { useCharacterMoveRange } from '@/hooks/useCharacterMoveRange';
  import { useRelativePosition } from '@/hooks/useRelativePosition';
  import { useDefaultStore } from '@/stores';
  import { useTeamStore } from '@/stores/team';
  import MoveGrid from './MoveGrid.vue';
  import { GridColor, type GridPosition } from '@/types/grid';
  import Archer from '@/game/character/Archer';
  import type { ICharacter } from '@/types/character';

  const cursorX = ref(0);
  const cursorY = ref(0);
  const characterMove = ref<'stand' | 'up' | 'down' | 'left' | 'right' | 'active'>('stand');
  const characterPositionIndex = ref(0);
  const mapWrapperElement = ref<HTMLElement | null>(null);
  const mapElement = ref<HTMLElement | null>(null);
  const moveGridWrapperElement = ref<HTMLElement | null>(null);
  const startAnimationElement = ref<HTMLButtonElement | null>(null);
  const stopAnimationElement = ref<HTMLButtonElement | null>(null);
  const downMoveElement = ref<HTMLButtonElement | null>(null);
  const upMoveElement = ref<HTMLButtonElement | null>(null);
  const GRID_SIZE: number = parseInt(import.meta.env.VITE_GRID_SIZE);
  const VITE_CHARACTER_ANIMATION_INTERVAL: number = parseInt(
    import.meta.env.VITE_CHARACTER_ANIMATION_INTERVAL,
  );
  const defaultState = useDefaultStore();
  const teamState = useTeamStore();

  let characterAnimationInterval: number | null = null;
  let characterMoveInterval: number | null = null;

  useGridMovement(cursorX, cursorY, {
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    elementRef: mapElement,
  });

  //////////////////// 开始-函数定义 ////////////////////

  function characterClicked(character: ICharacter) {
    if (defaultState.select_flag) {
      defaultState.select_flag = false;
      defaultState.current_character_id = '';
      defaultState.move_grid_range_list = [];
      defaultState.attack_grid_range_list = [];
      characterMove.value = 'stand';
      characterPositionIndex.value = 0;
    } else {
      defaultState.select_flag = true;
      defaultState.current_character_id = character.id;
      const moveRange = useCharacterMoveRange(character.id);
      for (const gridPosition of moveRange.move_range) {
        defaultState.move_grid_range_list.push({
          y: gridPosition.y,
          x: gridPosition.x,
        });
      }
      for (const gridPosition of moveRange.attack_range) {
        defaultState.attack_grid_range_list.push({
          y: gridPosition.y,
          x: gridPosition.x,
          color: GridColor.ATTACK,
        });
      }
      characterMove.value = 'active';
      characterPositionIndex.value = 0;
    }
  }

  function judgeCharacterClick(x: number, y: number): Promise<GridPosition> {
    return new Promise((resolve, reject) => {
      for (const character of teamState.character_list) {
        if (character.currentSpritePosition.x === x && character.currentSpritePosition.y === y) {
          characterClicked(character);
          return reject();
        }
      }
      return resolve({ x, y });
    });
  }

  function doCharacterMove({ x, y }: GridPosition, character: ICharacter): Promise<null> {
    return new Promise((resolve) => {
      if (characterMoveInterval) {
        clearInterval(characterMoveInterval);
      }
      if (x === character.currentSpritePosition.x) {
        if (y > character.currentSpritePosition.y) {
          characterMoveInterval = setInterval(() => {
            characterMove.value = 'down';
            if (character.currentSpritePosition.y >= y) {
              if (characterMoveInterval) {
                clearInterval(characterMoveInterval);
              }
              characterMove.value = 'active';
              characterPositionIndex.value = 0;
              return resolve(null);
            }
            character.currentSpritePosition.y += 4;
          }, 100);
        } else {
          characterMoveInterval = setInterval(() => {
            characterMove.value = 'up';
            if (character.currentSpritePosition.y <= y) {
              if (characterMoveInterval) {
                clearInterval(characterMoveInterval);
              }
              characterMove.value = 'active';
              characterPositionIndex.value = 0;
              return resolve(null);
            }
            character.currentSpritePosition.y -= 4;
          }, 100);
        }
      } else {
        if (x > character.currentSpritePosition.x) {
          characterMoveInterval = setInterval(() => {
            characterMove.value = 'right';
            if (character.currentSpritePosition.x >= x) {
              if (characterMoveInterval) {
                clearInterval(characterMoveInterval);
              }
              characterMove.value = 'active';
              characterPositionIndex.value = 0;
              return resolve(null);
            }
            character.currentSpritePosition.x += 4;
          }, 100);
        } else {
          characterMoveInterval = setInterval(() => {
            characterMove.value = 'left';
            if (character.currentSpritePosition.x <= x) {
              if (characterMoveInterval) {
                clearInterval(characterMoveInterval);
              }
              characterMove.value = 'active';
              characterPositionIndex.value = 0;
              return resolve(null);
            }
            character.currentSpritePosition.x -= 4;
          }, 100);
        }
      }
    });
  }

  async function characterMoveClicked({ x, y }: GridPosition) {
    const character = teamState.getCharacterById(defaultState.current_character_id);
    if (!character) {
      return;
    }
    const moveList: GridPosition[] = [];
    if (x !== character.currentSpritePosition.x) {
      moveList.push({
        x,
        y: character.currentSpritePosition.y,
      });
    }
    if (y !== character.currentSpritePosition.y) {
      moveList.push({ x, y });
    }

    for (const moveInfo of moveList) {
      await doCharacterMove(moveInfo, character);
    }
  }

  function judgeMoveRangeClick({ x, y }: GridPosition): Promise<GridPosition> {
    return new Promise((resolve, reject) => {
      for (const moveGrid of defaultState.move_grid_range_list) {
        if (moveGrid.x === x && moveGrid.y === y) {
          characterMoveClicked({ x, y });
          return reject();
        }
      }
      return resolve({ x, y });
    });
  }

  function mapClick(ev: MouseEvent) {
    if (!mapElement.value) return;
    const relativePosition = useRelativePosition(
      ev.clientX,
      ev.clientY,
      mapElement.value.getBoundingClientRect(),
      GRID_SIZE,
    );
    judgeCharacterClick(relativePosition.x, relativePosition.y)
      .then(judgeMoveRangeClick)
      .then(({ x, y }: GridPosition) => {
        console.log(x, y);
        defaultState.select_flag = false;
        defaultState.move_grid_range_list = [];
        defaultState.attack_grid_range_list = [];
      })
      .catch(() => {}); // 这里在reject里面处理逻辑
  }

  function mapContextMenu() {
    if (defaultState.select_flag) {
      const character = teamState.getCharacterById(defaultState.current_character_id);
      characterClicked(character as ICharacter);
    } else {
      defaultState.show_menu_flag = !defaultState.show_menu_flag;
    }
  }

  // 开始动画
  function clickStartAnimation() {
    clickStopAnimation(); // 避免重复启动
    if (startAnimationElement.value) {
      startAnimationElement.value.disabled = true;
    }
    if (stopAnimationElement.value) {
      stopAnimationElement.value.disabled = false;
    }
    characterAnimationInterval = setInterval(
      setCharacterAnimation,
      VITE_CHARACTER_ANIMATION_INTERVAL,
    );
  }

  // 停止动画
  function clickStopAnimation() {
    if (startAnimationElement.value) {
      startAnimationElement.value.disabled = false;
    }
    if (stopAnimationElement.value) {
      stopAnimationElement.value.disabled = true;
    }
    if (characterAnimationInterval) {
      clearInterval(characterAnimationInterval);
      characterAnimationInterval = null;
    }
    characterPositionIndex.value = 0;
  }

  function setCharacterAnimation() {
    characterPositionIndex.value =
      (characterPositionIndex.value + 1) %
      teamState.character_list[0]?.spriteDefine.move[characterMove.value].length;
  }

  const clickDownMove = () => {
    if (characterMoveInterval) {
      clearInterval(characterMoveInterval);
      characterMoveInterval = null;
    }
    const character = teamState.character_list[0];
    characterMoveInterval = setInterval(() => {
      if (character.currentSpritePosition.y + 1 >= 80) {
        character.currentSpritePosition.y = 80;
        characterPositionIndex.value = 0;
        if (characterMoveInterval) {
          clearInterval(characterMoveInterval);
          characterMoveInterval = null;
          characterMove.value = 'active';
          return;
        }
      }
      characterMove.value = 'down';
      character.currentSpritePosition.y += 4;
    }, 100);
  };

  const clickUpMove = () => {
    if (characterMoveInterval) {
      clearInterval(characterMoveInterval);
      characterMoveInterval = null;
    }
    const character = teamState.character_list[0];
    characterMoveInterval = setInterval(() => {
      if (character.currentSpritePosition.y - 1 <= 0) {
        character.currentSpritePosition.y = 0;
        characterPositionIndex.value = 0;
        if (characterMoveInterval) {
          clearInterval(characterMoveInterval);
          characterMoveInterval = null;
          characterMove.value = 'active';
          return;
        }
      }
      characterMove.value = 'up';
      character.currentSpritePosition.y -= 4;
    }, 100);
  };

  //////////////////// 结束-函数定义 ////////////////////

  onMounted(() => {
    teamState.character_list.push(
      new Archer({
        currentSpritePosition: {
          x: 0,
          y: 0,
        },
      }),
    );
    clickStartAnimation();
  });

  onUnmounted(() => {
    teamState.character_list = [];
    if (characterAnimationInterval) {
      clearInterval(characterAnimationInterval);
    }
  });
</script>

<template>
  <div ref="mapWrapperElement" class="wrapper">
    <div
      ref="mapElement"
      :style="{
        width: mapWidth + 'px',
        height: mapHeight + 'px',
        'background-image': `url('${mapUrl}')`,
      }"
      class="map"
      @click="mapClick"
      @contextmenu.prevent="mapContextMenu"
    >
      <div ref="moveGridWrapperElement" class="moveGrid">
        <MoveGrid
          v-for="(grid, index) in defaultState.move_grid_range_list"
          :key="index"
          :top="grid.y"
          :left="grid.x"
          :color="grid.color"
        />
        <MoveGrid
          v-for="(grid, index) in defaultState.attack_grid_range_list"
          :key="index"
          :top="grid.y"
          :left="grid.x"
          :color="grid.color"
        />
      </div>

      <Cursor
        :x="cursorX"
        :y="cursorY"
        :size="GRID_SIZE"
        :offset_x="mapOffsetX"
        :offset_y="mapOffsetY"
      />

      <div v-for="character in teamState.character_list" :key="character.id">
        <Character
          :characterMove="characterMove"
          :characterPositionIndex="characterPositionIndex"
          :character="character"
        />
      </div>

      <MapMenu v-show="defaultState.show_menu_flag" />
    </div>
  </div>
  <div>
    <select v-model="characterMove" name="switchMove">
      <option value="stand">站立</option>
      <option value="up">上</option>
      <option value="down">下</option>
      <option value="left">左</option>
      <option value="right">右</option>
      <option value="active">活动</option>
    </select>
    <select v-model.number="characterPositionIndex" name="switchPositionIndex">
      <option
        v-for="(_, index) in teamState.character_list[0]?.spriteDefine.move[characterMove]"
        :key="index"
        :value="index"
      >
        {{ index }}
      </option>
    </select>
  </div>
  <div>
    <button ref="startAnimationElement" @click="clickStartAnimation">开始动画</button>
    <button ref="stopAnimationElement" @click="clickStopAnimation">停止动画</button>
  </div>
  <div>
    <button ref="downMoveElement" @click="clickDownMove">向下移动</button>
    <button ref="upMoveElement" @click="clickUpMove">向上移动</button>
  </div>
</template>

<style scoped>
  .wrapper {
    position: relative;
    transform-origin: top left;
  }

  .map {
    position: relative;
    z-index: var(--z-index-map);
  }

  select:not(:last-child),
  button:not(:last-child) {
    margin-right: 10px;
    font-size: 12px;
  }
</style>
