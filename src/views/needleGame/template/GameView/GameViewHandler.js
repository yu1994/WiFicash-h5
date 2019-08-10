import GameViewTemplate from './GameView.html'
import { Game } from "../../js/Game";
import Toast from '@/components/toast'
import { vm } from "../../index";

class NeedleGame {
  constructor(container) {
    this.container = container
  }
  mount() {
    this.container.innerHTML = GameViewTemplate;
    this.game = new Game([ this.container.querySelector("#gameStage") ]);
    this.game.init();
    this.game.canvas.parentNode.style.width =  this.game.canvas.width + "px";
    this.game.canvas.parentNode.style.height = this.game.canvas.height + "px";
    let toast = new Toast();
    this.game.toast = function (level) {
      if (level === 10){
        toast.toggle(vm.content.gamePage.successHint);
      } else {
        toast.toggle(vm.content.gamePage.successNext);
      }

    }
  }
  startGame() {
    this.game.gameStart()
  }
  clearGame() {
    this.game.clearGamve();
    this.container.innerHTML = ""
  }
}
export {
  NeedleGame
}
