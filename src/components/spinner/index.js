import './styl.styl'
import template from './index.html'
export default class  {
  constructor() {
  }
  mount(container){
    this.container = container;
    container.innerHTML = template;
  }
  show() {
    this.container.style.display = 'block';
  }
  close() {
    this.container.style.display = 'none'
  }
}
