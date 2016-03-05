import _ from 'lodash';

import IntervalTimer from 'js/common/interval-timer';
import AssetManager from 'js/common/asset-manager';
import InGame from 'js/trial/in-game';

import Character from 'js/trial/character';
import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';
import Turret from 'js/trial/turret';

const FPS = 60;
const MS_PER_FRAME = 1000/FPS;

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 640;
    this.canvas.height = 640;
    this.context = canvas.getContext('2d');

    this.initKeyEvents();

    this.assetManager = new AssetManager();
    _.forEach([Character, Tile, Stage, Turret], (type) => {
      type.loadAssets(this.assetManager);
    });

    this.inGame = new InGame(this.context);
    this.timer = new IntervalTimer(MS_PER_FRAME, () => {
      this.newFrame();
    });

    this.assetManager.onLoad(() => {
      this.timer.start();
    });
  }

  initKeyEvents() {
    let makeHandlerFunc = (isPress) => {
      return (event) => {
        let keyContinue = this.acceptKeyEvent(event.keyCode, isPress);

        if (keyContinue === false) {
          if (event.preventDefault) {
            event.preventDefault();
          }
          if (event.stopPropigation) {
            event.stopPropigation();
          }
        }

        return keyContinue;
      };
    };

    document.addEventListener('keydown', makeHandlerFunc(true));
    document.addEventListener('keyup', makeHandlerFunc(false));
  }

  acceptKeyEvent(event, isPress) {
    return this.inGame.acceptKeyEvent(event, isPress);
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
}
