import './styl.styl'
import prizeTemplate from './prizeDialogTemp.html'
import thankTemplate from './thankDialogTemp.html'
import { getRequest } from "../../../utils";
 class Thank {
  constructor() {

  }
  mount(container , lang) {
    container.innerHTML = thankTemplate;
    container.querySelector('.hint').innerHTML = lang.sign;
    container.querySelector('.go').innerHTML = lang.go;
    container.querySelector('.thankClose').addEventListener('click',function () {
      container.style.display = 'none'
    });
    container.querySelector('.go').addEventListener('click',function () { // 没有抽到奖品 go
      window.android.unWinning();
    });
  }
}
 class Prize {
  constructor() {
  }
  mount(container, val, lang){
    container.innerHTML = prizeTemplate;
    container.querySelector('.hint_text_1').innerHTML = lang.sign_1;
    container.querySelector('.hint_text_2').innerHTML = lang.sign_2;
    container.querySelector('.go').innerHTML = lang.go;
    container.querySelector('.couponVal').innerHTML = val;
    container.querySelector('.couponClose').addEventListener('click',function () {
      container.style.display = 'none'
    });
    container.querySelector('.go').addEventListener('click',function () {
      window.android.winning();
    });
    if (getRequest().lang === 'hi') {
      container.querySelector('.promotion').className+= ' promotion_hi'
    }
  }
}
export {
  Prize,
  Thank
}
