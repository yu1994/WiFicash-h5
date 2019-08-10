import './index.styl'
import template from './dialog.html'
export default class  {
  constructor() {
  }
  mount(container){
    container.innerHTML = template;
  }
}
