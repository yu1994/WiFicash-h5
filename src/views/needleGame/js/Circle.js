import { BULLET_SPEED, ROTATION_RADIUS, RADIUS_SMALL, ROTATION_CENTER, RADIUS_BIG, BULLET_COLOR_STYLE } from "./bus";
//旋转中心
/** 圆*/
class Circle {
  constructor([x, y, radius, fillStyle = "#000000", strokeStyle]) {
    this.x = x;  // 圆形所在的位置 x
    this.y = y; // y
    this.radius = radius; // 半径
    this.fillStyle = fillStyle; //圆形的填充颜色
    this.strokeStyle = strokeStyle; // 插入后的 颜色
  }
  paint(context) {
    context.save();
    if (this.strokeStyle){
      context.strokeStyle = this.strokeStyle;//strokeStyle 属性设置或返回用于笔触的颜色 默认 #000000
      context.lineWidth = 1; // 线条宽度
    }
    context.fillStyle = this.fillStyle; // 填充的颜色
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true ); /* Math.PI = 3.14 = 180° */
    context.fill();
    if(this.strokeStyle){
      context.stroke();
    }
    context.restore();
  }
}
/** 中心大圆*/
class CircleCenter extends Circle{
  constructor(fillStyle, strokeStyle) {
    super([ROTATION_CENTER.x, ROTATION_CENTER.y, RADIUS_BIG, fillStyle, strokeStyle])
  }
  paint(context) {
    super.paint(context)
  }
  drawText(context,level, img){

    context.drawImage(img, this.x-RADIUS_BIG,this.y-RADIUS_BIG, 135, 135);
    context.beginPath();
    context.fillText(level, this.x,this.y);
    context.fillStyle = "#ffffff";
    context.font = "bold 18px Microsoft Yahei";
    context.textAlign = "center";
    context.textBaseline = "middle";
  }
}
/** 旋转的小圆 */
class CircleRotation extends Circle{
  constructor(angle, fillStyle, strokeStyle){
    super([0,0, RADIUS_SMALL, fillStyle, strokeStyle]);
    this.angle = angle; // angle 此小圆当前所在的角度(弧度为单位)
    this.resetPosition()
  }
  update(angle) {
    this.angle += angle;
    this.resetPosition();
  }
  resetPosition() {
    this.x = ROTATION_CENTER.x + ROTATION_RADIUS * Math.cos(this.angle);
    this.y = ROTATION_CENTER.y + ROTATION_RADIUS * Math.sin(this.angle);
  }
  paint(context) {
    context.save();
    context.strokeStyle = this.strokeStyle? this.strokeStyle : "#000000";
    context.lineWidth = 1;
    context.moveTo(ROTATION_CENTER.x, ROTATION_CENTER.y); //moveTo() 方法把路径移动到画布中的指定点
    context.lineTo(this.x, this.y); //lineTo() 方法添加一个新点，然后创建从该点到画布中最后指定点的线条
    context.stroke();
    context.restore();
    super.paint(context);
  }
}
/**用来发射的小圆**/
class CircleBullet extends Circle{
  constructor(y, index, fillStyle, strokeStyle){
    super([ROTATION_CENTER.x, y, RADIUS_SMALL, fillStyle, strokeStyle])
    this.newY = this.y; // y轴位置
    this.index = index;
  }
  update() {
    if (this.y > this.newY){
      this.y += BULLET_SPEED;
      this.y = this.y < this.newY? this.newY : this.y;
    }
  }
  paint(context){
    super.paint(context);
    context.save();
    context.font = "bold " + RADIUS_SMALL + "px Microsoft Yahei";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = BULLET_COLOR_STYLE;
    // 画布上输出的文本  x 坐标位置  y 坐标位置 允许的最大文本宽度，以像素计
    context.fillText(this.index, this.x, this.y, RADIUS_SMALL * 2);
    context.restore();
  }
}
export {
  Circle,
  CircleCenter,
  CircleRotation,
  CircleBullet
}
