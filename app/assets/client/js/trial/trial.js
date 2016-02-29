import IntervalTimer from 'js/common/interval-timer'
import AssetManager from 'js/common/asset-manager'
import Character from 'js/trial/character'
import InGame from 'js/trial/in-game'

const FPS = 60;
const MS_PER_FRAME = 1000/FPS;

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 640;
    this.canvas.height = 640;
    this.context = canvas.getContext("2d");

    this.assetManager = new AssetManager();
    this.character = new Character(this.assetManager);
    this.inGame = new InGame(this.context, this.character);
    this.timer = new IntervalTimer(MS_PER_FRAME, () => {
      this.newFrame()
    });

    this.assetManager.onLoad(() => {
      this.timer.start();
    });
  }

  newFrame() {
    this.update();
    this.draw();
  }

  update() {
    this.inGame.update();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.inGame.draw();
  }
};
