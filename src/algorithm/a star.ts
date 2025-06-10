type GridPosition = {
  x: number;
  y: number;
};

type Node = GridPosition & {
  g: number; // 从起点到当前节点的实际距离
  h: number; // 当前节点到终点的估算距离（启发式）
  f: number; // g + h
  parent: Node | null;
  walkable: boolean; // 是否可通行
};

export class AStarPathfinder {
  private grid: Node[][];
  private gridWidth: number;
  private gridHeight: number;

  constructor(gridWidth: number, gridHeight: number, obstacles: GridPosition[] = []) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.grid = this.createGrid(obstacles);
  }

  private createGrid(obstacles: GridPosition[]): Node[][] {
    const grid: Node[][] = [];

    for (let y = 0; y < this.gridHeight; y++) {
      grid[y] = [];
      for (let x = 0; x < this.gridWidth; x++) {
        const isObstacle = obstacles.some((obs) => obs.x === x && obs.y === y);
        grid[y][x] = {
          x,
          y,
          g: 0,
          h: 0,
          f: 0,
          parent: null,
          walkable: !isObstacle,
        };
      }
    }

    return grid;
  }

  /**
   * 查找从起点到终点的路径
   * @param start 起点坐标
   * @param end 终点坐标
   * @param maxMovement 最大移动距离（可选）
   * @returns 路径数组或null（如果找不到路径）
   */
  public findPath(
    start: GridPosition,
    end: GridPosition,
    maxMovement: number = Infinity,
  ): GridPosition[] | null {
    // 验证输入
    if (!this.isValidPosition(start) || !this.isValidPosition(end)) {
      return null;
    }

    // 如果起点或终点不可行走，返回null
    if (!this.grid[start.y][start.x].walkable || !this.grid[end.y][end.x].walkable) {
      return null;
    }

    // 初始化开放列表和关闭列表
    const openList: Node[] = [];
    const closedList: Node[] = [];

    // 添加起点到开放列表
    const startNode = this.grid[start.y][start.x];
    openList.push(startNode);

    while (openList.length > 0) {
      // 从开放列表中找到f值最小的节点
      let currentNode = openList[0];
      let currentIndex = 0;

      for (let i = 1; i < openList.length; i++) {
        if (openList[i].f < currentNode.f) {
          currentNode = openList[i];
          currentIndex = i;
        }
      }

      // 如果当前节点是终点，重构路径并返回
      if (currentNode.x === end.x && currentNode.y === end.y) {
        const path: GridPosition[] = [];
        let current: Node | null = currentNode;

        while (current !== null) {
          path.unshift({ x: current.x, y: current.y });
          current = current.parent;
        }

        // 检查路径是否在最大移动距离内
        if (path.length - 1 <= maxMovement) {
          return path;
        }
        return null; // 路径超出移动范围
      }

      // 将当前节点从开放列表移到关闭列表
      openList.splice(currentIndex, 1);
      closedList.push(currentNode);

      // 获取相邻节点
      const neighbors = this.getNeighbors(currentNode);

      for (const neighbor of neighbors) {
        // 如果邻居不可行走或在关闭列表中，跳过
        if (!neighbor.walkable || closedList.includes(neighbor)) {
          continue;
        }

        // 计算新的g值
        const gScore = currentNode.g + 1; // 假设每个移动成本为1

        // 如果新g值更小，或者邻居不在开放列表中
        if (gScore < neighbor.g || !openList.includes(neighbor)) {
          // 更新邻居节点
          neighbor.g = gScore;
          neighbor.h = this.heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = currentNode;

          // 如果邻居不在开放列表中，添加它
          if (!openList.includes(neighbor)) {
            openList.push(neighbor);
          }
        }
      }
    }

    // 开放列表为空但未找到路径
    return null;
  }

  /**
   * 获取相邻节点（四方向或八方向）
   * @param node 当前节点
   * @returns 相邻节点数组
   */
  private getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node;

    // 四方向移动（上、下、左、右）
    const directions = [
      { x: 0, y: -1 }, // 上
      { x: 1, y: 0 }, // 右
      { x: 0, y: 1 }, // 下
      { x: -1, y: 0 }, // 左
    ];

    // 如果是八方向移动，可以取消注释下面的代码
    /*
        const directions = [
            { x: 0, y: -1 },  // 上
            { x: 1, y: -1 },  // 右上
            { x: 1, y: 0 },   // 右
            { x: 1, y: 1 },  // 右下
            { x: 0, y: 1 },   // 下
            { x: -1, y: 1 },  // 左下
            { x: -1, y: 0 }, // 左
            { x: -1, y: -1 } // 左上
        ];
        */

    for (const dir of directions) {
      const newX = x + dir.x;
      const newY = y + dir.y;

      if (this.isValidPosition({ x: newX, y: newY })) {
        neighbors.push(this.grid[newY][newX]);
      }
    }

    return neighbors;
  }

  /**
   * 启发式函数（曼哈顿距离）
   * @param a 节点A
   * @param b 节点B
   * @returns 估算距离
   */
  private heuristic(a: GridPosition, b: GridPosition): number {
    // 曼哈顿距离（适合四方向移动）
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

    // 如果是八方向移动，可以使用欧几里得距离
    // return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  /**
   * 检查位置是否有效
   * @param position 要检查的位置
   * @returns 是否在网格范围内
   */
  private isValidPosition(position: GridPosition): boolean {
    return (
      position.x >= 0 &&
      position.x < this.gridWidth &&
      position.y >= 0 &&
      position.y < this.gridHeight
    );
  }

  /**
   * 更新网格中的障碍物
   * @param obstacles 障碍物位置数组
   */
  public updateObstacles(obstacles: GridPosition[]): void {
    // 首先重置所有节点的walkable为true
    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        this.grid[y][x].walkable = true;
      }
    }

    // 然后设置障碍物位置为不可行走
    for (const obs of obstacles) {
      if (this.isValidPosition(obs)) {
        this.grid[obs.y][obs.x].walkable = false;
      }
    }
  }
}

// 使用示例
/*
const gridWidth = 10;
const gridHeight = 10;
const obstacles = [
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 }
];

const pathfinder = new AStarPathfinder(gridWidth, gridHeight, obstacles);

const start = { x: 1, y: 1 };
const end = { x: 8, y: 8 };
const maxMovement = 15; // 棋子的最大移动步数

const path = pathfinder.findPath(start, end, maxMovement);

if (path) {
    console.log("找到路径:", path);
    console.log("路径长度:", path.length - 1); // 步数是路径长度减1
} else {
    console.log("找不到路径或路径超出移动范围");
}
*/
