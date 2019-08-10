
import { MVVM } from "../../common/js";
import Toast from '@/components/toast'
import { gameInfoApi, gameSuccessApi, updateGameNumberApi, exchangeCouponApi } from "../../api/needleGameAPI";
import {md5Activity, getRequest} from "../../utils";
import { en, hi } from "./lang/lang";
import Spinner from '@/components/spinner'
 let vm = null;
const lang = getRequest().lang;
const toast = new Toast();
const spinner = new Spinner();

window.onload = function () {
  const title = document.querySelector('title');
  lang === 'hi'? title.innerHTML = hi.gameName : title.innerHTML = en.gameName;
  document.querySelector('.dialog').style.display="block";
  toast.mount(document.querySelector('#toast'));
  spinner.mount(document.querySelector("#spinner"));
 vm = new MVVM({
    el: "#app",
    data: {
      content: lang === 'hi'? hi : en,
      langImage: lang === 'hi'? 'hi': '',
      langHI: lang === 'hi'? 1 : 0,
      langEN: lang !== 'hi'? 1 : 0,
      params: {
        userId: null,// 从 Android 获取
        mobileType: 3,
        versionNumber: '1.0',
        channelId: '3'
      },
      coupon: {
        id: null, // 优惠劵id
        count: null, //次数
        val: null // 面值
      },
      gameNumber: 0, // 游戏次数
      level: 1, // 第几关
      randomNum: null, // 随机数
      showStartView: true,
      showChance: false,
      showRules: false,
      showGameOver: false, // 游戏结束弹框
      showIncreaseNumber: false,
      showSuccessful: false, // 成功的
      showSorry: false, // 没有抽奖次数了
      updateGameNumber: true // 游戏次数是否更新成功  true 表示 最新的
    },
    methods: {
      start(){
        vm.level = 1;
        if (vm.gameNumber > 0){
          this.$options.methods.updateGameNumberHandler.call(vm);
        } else {
          vm.showSorry = true;
        }
      },
      toggleChanceHandler() {
        vm.showChance = !vm.showChance
      },
      toggleRulesHandler() {
        vm.showRules = !vm.showRules
      },
      toggleIncreaseHandler(){
        vm.showIncreaseNumber = !vm.showIncreaseNumber;
        vm.coupon.val = null;
        vm.coupon.count = null;
      },
      chooseCouponHandler() { //选择 兑换游戏次数
        window.Android.chooseCoupon()
      },
      gameOverClose() { // 游戏结束关闭
        vm.showGameOver = false;
        vm.$options.methods.leaveGame();
      },
      initGameInfoApiHandler(callback) { // 初始化 游戏次数
        gameInfoApi(vm.params,md5Activity(vm.params)).then( res => {
          res.data? vm.gameNumber = res.data.gameInfo : vm.gameNumber = 0;
          if (callback){
            callback()
          }
        })
      },
      leaveGame() { //离开游戏
        vm.showGameOver = false;
        vm.showSuccessful = false;
        vm.showSorry = false;
        vm.showStartView = true;
        if (vm.game){
          vm.$options.methods.initGameInfoApiHandler(null); //更新游戏次数
          vm.game.clearGame();
          vm.game = null;
        }else  {
          vm.game = null;
        }
      },
      playAgainHandler() { // 重新开始
        spinner.show();
        vm.$options.methods.initGameInfoApiHandler(function () { //更新游戏次数
          if (vm.gameNumber > 0) {
            vm.$options.methods.updateGameNumberHandler.call(vm,null);
            vm.showGameOver = false;
            vm.showSuccessful = false;
          } else {  // 如果 次数不够
            spinner.close();
            vm.showGameOver = false;
            vm.showSuccessful = false;
            vm.showSorry = true;
          }
        });
      },
      gameSuccessHandler() {
        const params = Object.assign({}, vm.params,{level: vm.level, randomNum: vm.randomNum});
        gameSuccessApi(params, md5Activity(params)).then(res => {
          vm.showSuccessful = true
        })
      },
      updateGameNumberHandler() { //游戏次数的更新
        const self = this;
        const params = Object.assign({}, vm.params,{number: vm.gameNumber});
        spinner.show();
        updateGameNumberApi(params, md5Activity(params)).then(res => {
          spinner.close();
          vm.randomNum = res.data.randomNum;
            if (!self.game){
              vm.showStartView = false;
              import('./template/GameView/GameViewHandler').then(({NeedleGame}) => {
                const gameCanvas = document.querySelector('#gameCanvas');
                self.game = new NeedleGame(gameCanvas);
                self.game.mount();
                self.game.startGame();
              });
            } else {
               vm.showStartView = false;
               self.game.startGame();
            }
        }).catch( e =>{
          spinner.close()
        })
      },
      exchangeCouponHandler(){ // 优惠劵兑换
        if (vm.coupon.val && vm.coupon.id){
          const params = Object.assign({}, vm.params,{amount: vm.coupon.val, accountId: vm.coupon.id});
          spinner.show();
          exchangeCouponApi(params, md5Activity(params)).then( res => {
            spinner.close();
            vm.$options.methods.toggleIncreaseHandler();
            vm.$options.methods.initGameInfoApiHandler();
            vm.coupon.val = null;
            vm.coupon.id = null;
            toast.toggle(vm.content.increase.successfulExchange)
          }).catch( e=> {
            spinner.close()
          })
        } else{
          toast.toggle(vm.content.increase.chooseCouponHint)
        }
      }
    }
  });
  window.AndroidResponseId = function(id) {
    vm.params.userId = id;
    vm.$options.methods.initGameInfoApiHandler();
  };


  /** start */
     // vm.params.userId = 883;
     // vm.$options.methods.initGameInfoApiHandler();
/** end */


  window.AndroidResponseCoupon = function(id, couponVal) {
    vm.coupon.id = id;
    vm.coupon.val = couponVal;
    vm.coupon.count = Math.abs(couponVal / 10);
  };

/** start */
// vm.$options.methods.initGameInfoApiHandler();
//   vm.showStartView = false;
//   import('./template/GameView/GameViewHandler').then(({NeedleGame}) => {
//     const gameCanvas = document.querySelector('#gameCanvas');
//     self.game = new NeedleGame(gameCanvas);
//     self.game.mount();
//     self.game.startGame();
//   });
/** end*/

};
export {
  vm
}
