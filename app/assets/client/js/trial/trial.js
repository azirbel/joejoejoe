import _ from 'lodash';

import IntervalTimer from 'js/common/interval-timer';
import AssetManager from 'js/common/asset-manager';
import KeyManager from 'js/common/key-manager';
import { KEY_W, KEY_A, KEY_S, KEY_D } from 'js/common/key-codes';

import Bullet from 'js/trial/bullet';
import Character from 'js/trial/character';
import InGame from 'js/trial/in-game';
import Stage from 'js/trial/stage';
import StageBuilder from 'js/trial/parse/stage-builder';
import Tile from 'js/trial/tile';
import Turret from 'js/trial/turret';
import LaserTurret from 'js/trial/laser-turret';

const FPS = 60;
const MS_PER_FRAME = 1000/FPS;

const CONSUMED_KEYS = new Set([KEY_W, KEY_A, KEY_S, KEY_D]);

export default class Trial {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 640;
    this.canvas.height = 640;
    this.context = canvas.getContext('2d');

    this.assetManager = new AssetManager();
    _.forEach([Character, Tile, Stage, LaserTurret, Turret, Bullet, StageBuilder], (type) => {
      type.loadAssets(this.assetManager);
    });

    this.keyManager = new KeyManager();
    this.initKeyEvents();

    this.inGame = new InGame(this.context, this.keyManager);
    this.timer = new IntervalTimer(MS_PER_FRAME, () => {
      this.newFrame();
    });

    this.assetManager.onLoad(() => {
      this.inGame.reset();
      this.timer.start();
    });
  }

  initKeyEvents() {
    let makeHandlerFunc = (isPress) => {
      return (event) => {
        let code = event.keyCode;
        if (CONSUMED_KEYS.has(code)) {
          if (isPress) {
            this.keyManager.pressKey(code);
          } else {
            this.keyManager.releaseKey(code);
          }

          if (event.preventDefault) {
            event.preventDefault();
          }
          if (event.stopPropigation) {
            event.stopPropigation();
          }
          return false;
        }

        return true;
      };
    };

    document.addEventListener('keydown', makeHandlerFunc(true));
    document.addEventListener('keyup', makeHandlerFunc(false));
  }

  newFrame() {
    this.update();
    this.draw();
  }

  update() {
    this.inGame.update();
    this.keyManager.newFrame();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.inGame.draw();
  }
}
