const [CANVAS_WIDTH , CANVAS_HEIGHT ] = [window.innerWidth, window.innerHeight];
// 旋转半径
//const ROTATION_RADIUS = Math.max(CANVAS_HEIGHT * 0.25, CANVAS_WIDTH * 0.5 - 40);
const ROTATION_RADIUS = Math.max(CANVAS_HEIGHT * 0.25, CANVAS_WIDTH * 0.5 - 40); //147
//小圆半径, 旋转周围及子弹圆形半径
const RADIUS_SMALL = 12.5;
//大圆半径, 旋转中心处的圆
const RADIUS_BIG = 67.5;
const ROTATION_CENTER = {x: CANVAS_WIDTH * 0.5, y:ROTATION_RADIUS + RADIUS_SMALL + 95};
// 子弹发射速度
const BULLET_SPEED = -12;
// 子弹之间的距离
const BULLET_SPACE = 15 + RADIUS_SMALL * 2;
const BULLET_COLOR_STYLE = "#B7540B";
const FILL_STYLE = "#FFFFFF"; // circle 填充颜色
//子弹最高处的y坐标, 实际坐标为此值减去子弹半径
const BULLET_Y = ROTATION_CENTER.y + ROTATION_RADIUS + BULLET_SPACE + CANVAS_HEIGHT * 0.2-95;
//默认旋转速度  弧度为单位
const ROTATION_SPEED = 0.03;
/**难度等级 2 表示旋转指针的个数 6 表示 要插入的 针 0.01 表示旋转速度
 * */
const level = [
  [2,6,0.03], [2,8,0.03], [2,10,0.035], [2,11,0.035], [2,12,0.035],
  [2,12,0.04], [2,13,0.04], [3, 13, 0.035], [3, 14, 0.035], [3, 14, 0.04],
  [3,15,0.04],[3,16,0.04],[3,17,0.04],[3,18,0.04],[3,20,0.04],
  [4,15,0.05],[4,16,0.05],[4,18,0.05],[4,20,0.05],
  [5, 20, 0.06],[5, 24, 0.06],[5, 30, 0.06]
];
export {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ROTATION_RADIUS,
  RADIUS_SMALL,
  ROTATION_CENTER,
  RADIUS_BIG,
  BULLET_SPEED,
  BULLET_SPACE,
  BULLET_COLOR_STYLE,
  BULLET_Y,
  ROTATION_SPEED,
  FILL_STYLE,
  level
}
