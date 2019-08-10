export function getRndInteger([min,max]) {
  let res = Math.floor(Math.random() * (max - min) ) + min;
  // if (res >= 45 && res <= 90){
  //   return res = 30;
  // } else if (res >= 225 && res <= 270){
  //   return res = 30;
  // }
 // console.log(res);
  if (res <= min+5){
    return res + 5;
  } else if ( res >= max-5) {
    return res - 5
  } else return res;
}
function winnersRandom([min,max]) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
export function computedScope(count,step) {
  let result = 360/step,
    max = result*count,
    min = max -result;
  return [ min, max ]
}

const activityPro = ["Rs.100 coupon", "Rs.200 coupon", "Rs.400 coupon", "Rs.600 coupon", "Realme 3 pro *1", "Apple iphone *1"];
const winnersList = document.querySelector('#winnersList');
function winnersTemplate() {
  let obj = {
    random1: winnersRandom([600,999]),
    random2: winnersRandom([100,999]),
    prize: winnersRandom([100,999])
  };
  let prize = null;
  obj.prize <= 110? prize = activityPro[5] : obj.prize <= 130? prize = activityPro[4] : obj.prize <= 150? prize = activityPro[3] : obj.prize <= 450? prize = activityPro[2] : obj.prize <= 600? prize = activityPro[1] : prize = activityPro[0];
  return `<li><span>${obj.random1}***${obj.random2}</span><span>${prize}</span></li>`
}
export function addWinnersList() {
  let html = ``;
  for (let i = 0 ; i < 5; i++) {
    html+= winnersTemplate();
  }
  winnersList.innerHTML = html;
}
const dom = {};
export function operationBtn(){
  document.querySelector('#prizesBtn').addEventListener('click',function () {
    dom.prizesDetail = document.querySelector('.prizesDetail');
    dom.prizesDetail.style.display = 'block'
  });
  document.querySelector('.prizeClose').addEventListener('click',function () {
    dom.prizesDetail.style.display = 'none'
  });
  document.querySelector('#rulesBtn').addEventListener('click',function () {
    dom.rulesDetail = document.querySelector('.rulesDetail');
    dom.rulesDetail.style.display = 'block'
  });
  document.querySelector('.ruleClose').addEventListener('click',function () {
    dom.rulesDetail.style.display = 'none'
  });
}

