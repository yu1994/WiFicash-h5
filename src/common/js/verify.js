// export function verifyMobile() {
//   return {
//     test:/^(13[0-9]|15([0-3]|[5-9])|17[2,3,4,5,6,8,9]|18[0-9])\d{8}$/,
//     required:true,
//     message:"请输入正确的手机号码"
//   }
// }
// export function verifyNote() {
//   return {
//          test:/^\d{6}$/,
//           required:true,
//          message:'请输入正确的验证码'
//   }
// }
// export function verifyPasswordTwo(vm) {
//   return {
//     test(val) {
//       return val === vm.attr.password.val
//     },
//     message:"密码输入不一致"
//   }
// }
// export function verifyPassword() {
//   return {
//       test:/^[A-Za-z0-9]+$/,
//       required:true,
//       message:'密码格式错误(由字母和数字组成)'
//   }
// }
// //test:/^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/,
// //   test:/^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
// export function verifyMoney() {
//   return {
//     test:/^(((([1-9]{1}\d*)|(0{1}))(\.\d{1,2}))|(^[1-9]\d*))$/,
//     required:true,
//     message:'输入金额不正确,请重新输入!'
//   }
// }
//
//
//
// export function verifyImg(files) {
//    if (files == undefined){
//      return {error:true,msg:'请上传图片!'};
//    }
//   var type = files.name;
//       type = (type.substr(type.lastIndexOf("."))).toLowerCase();
//   if (type != ".jpg" && type != ".bmp" && type != ".jpeg" && type != ".png") {
//     return {error:true,msg:'图片格式有误,请重新上传!'};
//   }
//   return {error:false};
// }
//
//
//
// export function showErrorGroup(vm,error) {
//   vm.clue.show = true;
//   vm.clue.val = error;
//   var times =  setTimeout(() => {
//     vm.clue.show = false;
//     clearTimeout(times)
//     times = null;
//   },1500);
// }
// export function timeController(vm,route) {
//   var times = null;
//   const index = 1500;
//   times = setTimeout(()=>{
//     vm.$router.push(route);
//     clearTimeout(times);
//     times = null;
//   },index);
// }
// export function judge(vm,check) {
//   console.log(vm.$vuerify.$errors);
//   var isCheck = null;
//   check?  isCheck = vm.$vuerify.check([check]) :  isCheck = vm.$vuerify.check();
//   if (!isCheck){  //验证错误
//     var errorArr = [];
//     for(var i in vm.$vuerify.$errors){
//       errorArr.push(vm.$vuerify.$errors[i])
//     }
//     console.log(errorArr)
//     showErrorGroup(vm,errorArr[0]);
//     return false;
//   }else {
//     return true
//   }
// }
// export function isIos() {
//   var u = navigator.userAgent;
//   return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
// }
//
//
//
// export function isAndroid() {
//   var u = navigator.userAgent;
//   return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1
// }
