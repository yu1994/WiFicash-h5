import { CircleBullet, CircleCenter, CircleRotation} from "./Circle";
import {CANVAS_HEIGHT, CANVAS_WIDTH, BULLET_Y, BULLET_SPACE, ROTATION_CENTER, ROTATION_SPEED, ROTATION_RADIUS, RADIUS_SMALL, FILL_STYLE, level} from "./bus";
import { MobileTouch } from "./MobileTouch";
import { vm } from "../index";
class Game {
  /** 实例属性 */
  level = 1;
  isPause = false; /*游戏当前是否处于暂停状态, 可通过gamePause方法暂停, 只读*/
  isOver = true;/*当前游戏是否已经结束,只读*/
  isCanTap = true;/*当前游戏Canvas是否可以点击,只读*/
  centerCircle = null;
  rotationCircles = []; // 旋转的
  bulletCircles = []; //子弹
  rotationSpeed = 0.02;
  mobileTouch = null;
  levelSuccessHandle = null;
  constructor([canvas, levelArray = level ]) {
    if (!canvas || !canvas.getContext){
      throw new Error("params canvas empty")
    }
    this.canvas = canvas;
    this.levelArray = levelArray;
  }
  init() {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.context = this.canvas.getContext("2d");
    if (!this.centerCircle) this.centerCircle = new CircleCenter(FILL_STYLE); // 中心圆 circle
    const self = this;
    this.audio = document.querySelector('#audio');
    this.mobileTouch = new MobileTouch(this.canvas, {tap: function (e) {
        self.tapHandle.call(self, e)
      }});
    this.centerImage = new Image();
   // this.centerImage.src = 'http://10.0.20.39:7777/static/img/circle@2x.png';
    this.centerImage.src = process.env.BASE_API+'/html/static/img/circle@2x.png';

    // 旋转中心的大圆
  }
  gameStart() {
    this.level = 1;
    this.isPause = false; /*游戏当前是否处于暂停*/
    this.isOver = false; /*是否结束*/
    this.isCanTap = true; /*当前游戏Canvas是否可以点击*/
    this.levelChange();
    this.update()
  }
  /**文字 自动换行 */
  canvasTextAutoLine(str,initX,initY,lineHeight) {
    // Click on the screen to let the needles at
    this.context.font = "12px Righteous-Regular";
    this.context.textAlign = "center";
    this.context.fillText(str,CANVAS_WIDTH/2,initY);
    // this.context.restore()
    // let lineWidth = 0;
    // let canvasWidth = CANVAS_WIDTH;
    // let lastSubStrIndex= 0;
    // for(let i=0;i<str.length;i++){
    //   lineWidth+=this.context.measureText(str[i]).width;
    //   this.context.font = "14px Righteous-Regular";
    //   this.context.textAlign = "center";
    //   if(lineWidth>canvasWidth-initX){//减去initX,防止边界出现的问题
    //     this.context.fillText(str.substring(lastSubStrIndex,i),initX,initY, CANVAS_WIDTH );
    //     initY+=lineHeight;
    //     lineWidth=0;
    //     lastSubStrIndex=i;
    //   }
    //   if(i==str.length-1){
    //     this.context.fillText(str.substring(lastSubStrIndex,i+1),initX,initY);
    //   }
    // }
  }
  update() {
    if (!this.isPause && !this.isOver){
      for (let i = 0, len = this.rotationCircles.length; i < len; i++){
        this.rotationCircles[i].update(this.rotationSpeed)
      }
      for (let i = 0, len = this.bulletCircles.length; i < len; i++){
        this.bulletCircles[i].update();
      }
      if (!this.isCanTap){
        let currentBullet = this.bulletCircles[this.bulletCircles.length - 1];
        if (currentBullet.y <= ROTATION_CENTER.y + ROTATION_RADIUS + RADIUS_SMALL*2){ // 子弹 y轴的距离 小于 旋转半径 和 子弹直径
          if (this.checkCollision(currentBullet)){
            this.gameOver();
          } else if (currentBullet.y === ROTATION_CENTER.y + ROTATION_RADIUS){ // 当前的子弹Y轴位置 是否等于 旋转中心y轴位置 + 旋转半径
              this.bulletCircles.pop(); // 如果 当前子弹跑到上面 移除 bulletCircles中的 哪个子弹
              this.isCanTap = true;
              this.rotationCircles.push(new CircleRotation(Math.PI * 0.5, FILL_STYLE));
            if (this.bulletCircles.length <= 0){
              this.nextLevel()
            }
          }
        }
      }
      this.paint();
    }
  }
  paint() {
    let self = this;
    this.context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT); //在给定的矩形内清除指定的像素
    for (let i = 0, len = this.rotationCircles.length ; i < len; i++){
      this.rotationCircles[i].paint(this.context);
    }
    // 子弹
    for (let i = 0, len = this.bulletCircles.length; i < len; i++){
      this.bulletCircles[i].paint(this.context)
    }
    // 旋转中心的大圆
    // this.centerImage.onload = function () {
      self.centerCircle.paint(self.context);
      self.centerCircle.drawText(self.context, self.level, self.centerImage);
   // };
    window.requestAnimationFrame(function () {
      self.update();
      self.canvasTextAutoLine(vm.content.gamePage.line_1,20,38);
      self.canvasTextAutoLine(vm.content.gamePage.line_2,20,58)
    })
  }
  nextLevel() {
    let self = this;
    this.level++;
    this.gamePause();
    if (this.levelSuccessHandle){
       // this.levelSuccessHandle(this.level)
      // console.info(this.levelSuccessHandle)
    } else {
       this.toast(this.level);
       setTimeout(function () {
         vm.level = self.level;
        self.gameContinue.call(self, true)
      }, 3000);
    }
  }
  gamePause() {
    this.isCanTap = false;
    this.isPause =  true
  }
  checkCollision(currentBullet) { //判断游戏是否成功过关
    let len = this.rotationCircles.length, tx, ty, dis;
    let judge = 4 * RADIUS_SMALL * RADIUS_SMALL;
    for (let i = 0; i < len; i++) {
      tx = currentBullet.x - this.rotationCircles[i].x;
      ty = currentBullet.y - this.rotationCircles[i].y;
      dis = tx*tx + ty*ty;
      if (dis <= judge){
        return true
      }
    }
    return false;

  }
  gameContinue(resetLevel) { //游戏暂停后继续, 参数表示是否重新开始本关卡
    if (!this.isPause) return;
    this.isPause = false;
    this.isCanTap = true;
    if (this.isOver || resetLevel) {
      this.levelChange();
      this.isOver = false
    }
    this.update()
  }
  levelChange() {
    this.rotationCircles = [];
    this.bulletCircles = [];
    let i, len, levelVal, tempCircle, angle;
    levelVal = Math.min(this.level - 1, this.levelArray.length - 1);
    len = this.levelArray[levelVal][0]; // 获取 初始化 旋转的小圆
    angle = Math.PI * 2 / len;
    for (i = 0; i < len; i++) {
      tempCircle = new CircleRotation(angle*i, FILL_STYLE);
      this.rotationCircles.push(tempCircle)
    }
    // 子弹 bullet
    let bulletLen = this.levelArray[levelVal][1]; // 子弹个数
    for (let i = 0; i < bulletLen; i++){
      // bullet_y 第一个 y轴 距离顶部的距离
      tempCircle = new CircleBullet(BULLET_Y + (BULLET_SPACE) * (bulletLen - i -1), (i+1), FILL_STYLE);
      this.bulletCircles.push(tempCircle)
    }
    //是否有 采用 自定义 旋转速速 还是默认速度
    if (this.levelArray[levelVal].length === 3){
      this.rotationSpeed = this.levelArray[levelVal][2];
    } else this.rotationSpeed = ROTATION_SPEED;
    console.info(this.rotationSpeed)
  }
  gameOver() {
    this.isOver = true;
    this.isCanTap = false;
    if (this.level > 10){
      vm.$options.methods.gameSuccessHandler()
    } else {
      vm.showGameOver = true;
    }
  }
  clearGamve() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
  tapHandle(e) { // 鼠标或触摸后出发的事件监听(在isCanTap为true时, 发射子弹)
    if (this.audio){
      this.audio.play();
    }
    e.stopPropagation();
    e.preventDefault();
    if (this.isCanTap){
      this.isCanTap = false;
      //this.bulletCircles[i].y bulletCircle Y轴上的坐标
      // newY 子弹最顶部距离 canvas 顶部的坐标值
      for (let i = 0, len = this.bulletCircles.length; i < len; i++){
        this.bulletCircles[i].newY = this.bulletCircles[i].y - BULLET_SPACE;
      }
      this.bulletCircles[this.bulletCircles.length -1 ].newY = ROTATION_CENTER.y + ROTATION_RADIUS;
      console.info(this.bulletCircles)
    }
  }
}
export  {
  Game
}

