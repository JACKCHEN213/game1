// 创建游戏地图
const gameMap: GameMap = {
    width: 10,
    height: 10,
    terrain: [
        // 地形布局 (简化为示例)
        ['plain', 'plain', 'forest', 'mountain', ...],
        ['water', 'plain', 'desert', 'forest', ...],
        // ...其他行
    ],
    units: [
        {
            type: 'mage',
            position: { x: 2, y: 2 },
            moveRange: 4,
            items: ['沙漠披风']
        },
        {
            type: 'bandit',
            position: { x: 5, y: 5 },
            moveRange: 3,
            items: []
        }
    ],
    currentUnit: {
        type: 'infantry',
        position: {
            x: 1,
            y: 1,
        },
        moveRange: 1,
        items: ['13123'],
    }/* 当前行动单位引用 */
};

const movementSystem = new MovementSystem();
const result = movementSystem.getReachablePositions(gameMap);

console.log("可到达位置:", result.reachable);
console.log("最近敌人位置:", result.nearestEnemyPosition);