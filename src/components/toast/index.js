import './toast.styl'
import template from './toast.html'
export default class  {
  constructor() {
  }
  mount(container){
    container.innerHTML = template;
  }
  toggle(msg) {
    if (!this.dom){
      this.dom = document.querySelector('.msg');
    }
    this.dom.innerHTML = msg;
    this.dom.style.display = 'flex';
    this.dom.style.display = '-webkit-flex';
    this.dom.style.display = '-ms-flex';
    let time = null, self = this;
    time = setTimeout(function () {
      clearTimeout(time);
      time = null;
      self.dom.style.display = 'none'
    },3000)
  }
  close(msg) {
    if (!this.dom){
      this.dom = document.querySelector('.msg');
    }
    this.dom.style.display = 'none'
  }
  show(msg) {
    if (!this.dom){
      this.dom = document.querySelector('.msg');
    }
    this.dom.innerHTML = msg;
    this.dom.style.display = 'flex';
    this.dom.style.display = '-webkit-flex';
    this.dom.style.display = '-ms-flex';
  }
}
