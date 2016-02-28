import IntervalTimer from 'js/common/interval-timer'
import AssetManager from 'js/common/asset-manager'

const FPS = 60;
const MS_PER_FRAME = 1000/FPS;

const STICK_FILE = 'res/stick.png';

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 640;
    this.canvas.height = 640;
    this.context = canvas.getContext("2d");

    this.assetManager = new AssetManager();
    this.timer = new IntervalTimer(MS_PER_FRAME, () => {
      this.newFrame()
    });

    this.assetManager.onLoad(() => {
      this.timer.start();
    });

    this.loadAssets();
  }

  newFrame() {
    this.draw();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.with, this.canvas.height);

    let stickImage = this.assetManager.get(STICK_FILE);
    this.context.drawImage(stickImage, 50, 50);
  }

  loadAssets() {
    this.assetManager.loadAsset(STICK_FILE);
  }
};
