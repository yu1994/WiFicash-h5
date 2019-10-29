import FastClick from 'fastclick'
import { activityApi } from "../../api/activityApi";
import {addWinnersList, operationBtn, getRndInteger, computedScope} from "./selfFun";
import { md5Activity } from "../../utils";
import {getRequest} from "../../utils";
import {MVVM} from "../../common/js";
 import Toast from '@/components/toast'
import {langHI} from "../../lang/hi";
import { langEN } from "../../lang/en";
const request = getRequest();
 window.onload = function () {
   const title = document.querySelector('title');
   request.lang === 'hi'? title.innerHTML = "गतिविध" : "";
    const userId = window.android.getUserId();
    const extractNumber = window.android.getNumber();
   // const userId = '50';
   // const extractNumber = 4;
   const [toast] = [new Toast()];
   toast.mount(document.querySelector('#toast'));
  FastClick.attach(document.body);
  addWinnersList();
  setInterval(function () {
    addWinnersList();
  },3000);
   operationBtn();

   const turntable = document.querySelector('.turntable');
  let off = true; //是否正在抽奖
   const vm = new MVVM({
     el:'#app',
     data:{
       lang:request.lang === 'hi'? langHI : langEN,
       langBg: request.lang === 'hi'? 'bg_hi': '', // 背景圖片
       params: {
         mobileType: 3,
         versionNumber: '1.0',
         userId:userId, // 从 Android 获取
         channelId: '3',
         scene: request.scene,
         poolName: request.poolName? request.poolName : '01'
       },
       poolName: request.poolName === '02' ? 'turntable_two': 'one',
       signMsg: '',
       extractNumber // 从 Android 获取
     },
     methods:{
       thankHandle:function(level) {
         extract(level);
         let timing = null;
         timing = setTimeout(function () {
           off = !off;
           clearTimeout(timing);
           import('./prizeDialog').then(({Thank}) => {
             const extractResult = document.querySelector('.result');
             new Thank().mount(extractResult, vm.lang.thankChunk);
             extractResult.style.display = 'block';
           });
         },4000);
       },
       prizeHandle:function(level,name) {
         extract(level);
         let timing = null;
         timing = setTimeout(function () {
           off = !off;
           clearTimeout(timing);
           import('./prizeDialog').then(({Prize}) => {
             const extractResult = document.querySelector('.result');
             new Prize().mount(extractResult,name, vm.lang.prizeChunk);
             extractResult.style.display = 'block';
           });
         },4000)
       },
       extractHandler:function () {
         if (off && this.extractNumber > 0){
           this.extractNumber --;
           off = !off;
           this.signMsg = md5Activity(this.params);
           activityApi(this.params, this.signMsg).then(res => {
             if (res.data.level){
               let level = res.data.level;
               if (level == 2 || level == 6) level = 8; // 手机
               if (request.poolName == '02'){
                 if (level == 8){
                  this.$options.methods.thankHandle(level)
                 } else {
                  this.$options.methods.prizeHandle(level,res.data.name)
                 }
               } else {
                  if (level == 4 || level == 8){
                    this.$options.methods.thankHandle(level)
                  } else {
                    this.$options.methods.prizeHandle(level,res.data.name)
                  }
               }
             }
           });
         } else if (off && this.extractNumber == 0){
           toast.toggle(vm.lang.toast.num)
         }
       }
     }
   });
   let oldRotate = 360;
   let index = 3; // 旋转圈数
   let rdm = 0; // 随机角度
  function extract(count) {
    //let index = Math.ceil(Math.random()*3+2); // 旋转圈数
     const deg = getRndInteger(computedScope(count, 8)); // 区间的度数
    rdm = deg+index*360;
    let timing = null;
    timing = setInterval(function () {
      if (rdm > oldRotate + 720){
        clearInterval(timing);
        timing = null;
        oldRotate = rdm;
        extractedTransform(rdm);
      } else {
        index = index+5;
        rdm = deg+index*360;
        console.log(rdm);
      }
    },100);
  }
   function extractedTransform(rdm) {
     turntable.style.webkitTransform = "rotate(" + rdm + "deg)";
     turntable.style.MozTransform = "rotate(" + rdm + "deg)";
     turntable.style.msTransform = "rotate(" + rdm + "deg)";
     turntable.style.OTransform = "rotate(" + rdm + "deg)";
     turntable.style.transform = "rotate(" + rdm + "deg)";
   }
};




