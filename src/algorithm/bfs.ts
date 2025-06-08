type Position = { x: number; y: number };
type TerrainType = 'plain' | 'mountain' | 'water' | 'forest' | 'desert' | 'swamp';
type UnitType = 'infantry' | 'cavalry' | 'flyer' | 'mage' | 'bandit' | 'pirate';

interface TerrainEffect {
    cost: number; // 移动消耗 (Infinity表示完全阻碍)
    canPass: boolean; // 是否可以通过
    terrain?: string; // 地形类型
}

interface Unit {
    type: UnitType;
    position: Position;
    moveRange: number;
    items: string[];
}

interface GameMap {
    width: number;
    height: number;
    terrain: TerrainType[][];
    units: Unit[];
    currentUnit: Unit;
}

class MovementSystem {
    private terrainEffects: Record<UnitType, Partial<Record<TerrainType, TerrainEffect>>> = {
        infantry: {
            plain: {cost: 1, canPass: true},
            mountain: {cost: Infinity, canPass: false},
            water: {cost: Infinity, canPass: false},
            forest: {cost: 2, canPass: true},
            desert: {cost: 3, canPass: true},
            swamp: {cost: 4, canPass: true}
        },
        cavalry: {
            plain: {cost: 1, canPass: true},
            mountain: {cost: Infinity, canPass: false},
            water: {cost: Infinity, canPass: false},
            forest: {cost: 3, canPass: true},
            desert: {cost: 2, canPass: true},
            swamp: {cost: Infinity, canPass: false}
        },
        flyer: {
            plain: {cost: 1, canPass: true},
            mountain: {cost: 1, canPass: true},
            water: {cost: 1, canPass: true},
            forest: {cost: 1, canPass: true},
            desert: {cost: 1, canPass: true},
            swamp: {cost: 1, canPass: true}
        },
        mage: {
            plain: {cost: 1, canPass: true},
            mountain: {cost: Infinity, canPass: false},
            water: {cost: Infinity, canPass: false},
            forest: {cost: 2, canPass: true},
            desert: {cost: 1, canPass: true}, // 魔法师在沙漠正常移动
            swamp: {cost: 3, canPass: true}
        },
        bandit: {
            plain: {cost: 1, canPass: true},
            mountain: {cost: 2, canPass: true}, // 山贼可以上山
            water: {cost: Infinity, canPass: false},
            forest: {cost: 1, canPass: true},
            desert: {cost: 2, canPass: true},
            swamp: {cost: 3, canPass: true}
        },
        pirate: {
            plain: {cost: 2, canPass: true},
            mountain: {cost: Infinity, canPass: false},
            water: {cost: 1, canPass: true}, // 海盗可以直接下海
            forest: {cost: 3, canPass: true},
            desert: {cost: Infinity, canPass: false},
            swamp: {cost: 2, canPass: true}
        }
    }

    private itemEffects: Record<string, (effect: TerrainEffect) => TerrainEffect> = {
        '水上行走': (effect) => effect.terrain === 'water' ? {cost: 1, canPass: true} : effect,
        '山地靴': (effect) => effect.terrain === 'mountain' ? {cost: 2, canPass: true} : effect,
        '沙漠披风': (effect) => effect.terrain === 'desert' ? {cost: 1, canPass: true} : effect
    }

    public getReachablePositions(gameMap: GameMap): {
        reachable: Position[];
        nearestEnemyPosition: Position;
    } {
        const {currentUnit, terrain, units, width, height} = gameMap
        const enemyUnits = units.filter(u => u !== currentUnit)
        const visited = new Set<string>()
        const reachable: Position[] = []
        const queue: { pos: Position; cost: number }[] = [
            {pos: currentUnit.position, cost: 0}
        ]

        // BFS遍历可到达位置
        while (queue.length > 0) {
            const {pos, cost} = queue.shift()!
            const key = `${pos.x},${pos.y}`

            if (visited.has(key)) {continue}
            visited.add(key)

            if (cost > 0) { // 不包含起点
                reachable.push(pos)
            }

            // 获取相邻位置
            this.getNeighbors(pos).forEach(neighbor => {
                if (!this.isValidPosition(neighbor, width, height)) {return}

                const terrainType = terrain[neighbor.y][neighbor.x]
                let effect = this.getTerrainEffect(currentUnit, terrainType)

                // 应用道具效果
                currentUnit.items.forEach(item => {
                    if (this.itemEffects[item]) {
                        effect = this.itemEffects[item](effect)
                    }
                })

                if (!effect.canPass) {return}

                const newCost = cost + effect.cost
                if (newCost <= currentUnit.moveRange) {
                    queue.push({pos: neighbor, cost: newCost})
                }
            })
        }

        // 寻找最近敌人位置
        let nearestEnemyPosition = currentUnit.position
        let minDistance = Infinity

        reachable.forEach(pos => {
            enemyUnits.forEach(enemy => {
                const distance = this.calculateDistance(pos, enemy.position)
                if (distance < minDistance) {
                    minDistance = distance
                    nearestEnemyPosition = pos
                }
            })
        })

        return {reachable, nearestEnemyPosition: minDistance < Infinity ? nearestEnemyPosition : currentUnit.position}
    }

    private getTerrainEffect(unit: Unit, terrainType: TerrainType): TerrainEffect {
        const defaultEffect = {cost: Infinity, canPass: false}
        return this.terrainEffects[unit.type][terrainType] || defaultEffect
    }

    private getNeighbors(pos: Position): Position[] {
        return [
            {x: pos.x, y: pos.y - 1}, // 上
            {x: pos.x + 1, y: pos.y}, // 右
            {x: pos.x, y: pos.y + 1}, // 下
            {x: pos.x - 1, y: pos.y} // 左
        ]
    }

    private isValidPosition(pos: Position, width: number, height: number): boolean {
        return pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y < height
    }

    private calculateDistance(a: Position, b: Position): number {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    }
}

new MovementSystem()