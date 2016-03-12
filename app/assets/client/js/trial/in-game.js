import _ from 'lodash';

import Vector from 'js/common/vector';
import TickTimer from 'js/common/tick-timer';

import ApplyKeypress from 'js/trial/steps/apply-keypress';
import MoveCharacter from 'js/trial/steps/move-character';
import UpdateTurretAngles from 'js/trial/steps/update-turret-angles';
import CreateBullets from 'js/trial/steps/create-bullets';
import UpdateBullets from 'js/trial/steps/update-bullets';
import CheckPlayerHit from 'js/trial/steps/check-player-hit';
import KeepState from 'js/trial/steps/keep-state';
import MoveReaction from 'js/trial/steps/move-reaction';

import DrawEntity from 'js/trial/steps/draw-entity';
import DrawEntityAt from 'js/trial/steps/draw-entity-at';
import DrawTurrets from 'js/trial/steps/draw-turrets';
import DrawBullets from 'js/trial/steps/draw-bullets';
import DrawText from 'js/trial/steps/draw-text';

import Character from 'js/trial/character';
import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';
import StageBuilder from 'js/trial/parse/stage-builder';

export default class InGame {
  constructor(context, keyManager) {
    this.context = context;
    this.keyManager = keyManager;

    this.bestScore = 0;
    this.currentScore = 0;
    this.lastScore = 0;
  }

  reset() {
    this.lastScore = this.currentScore;
    this.currentScore = 0;

    this.tickTimer = new TickTimer();

    this.stage = StageBuilder.buildStage(4);
    this.character = new Character(this.stage.getSpawnVect());
    KeepState.apply(this.character);

    this.updateSteps = [];
    this.drawSteps = [];

    this.initUpdateSteps();
    this.checkPlayerHit = new CheckPlayerHit(this.character, this.stage);
    this.initDrawSteps();

    this.runPreUpdateSteps();
  }

  runPreUpdateSteps() {
    UpdateTurretAngles.apply(this.stage.enemies.turret || [], this.character);
    UpdateTurretAngles.apply(this.stage.enemies.laser || [], this.character);
    CreateBullets.apply(this.stage.enemies.turret, this.stage.bullets, this.tickTimer);
  }

  initUpdateSteps() {
    this.updateSteps = [
      new KeepState(this.character),
      new ApplyKeypress(this.character, this.keyManager, this.stage),
      new MoveCharacter(this.character, this.stage),
      new UpdateTurretAngles(this.stage.enemies.turret || [], this.character),
      new UpdateTurretAngles(this.stage.enemies.laser || [], this.character),
      new UpdateBullets(this.stage, this.stage.bullets),
      new CreateBullets(this.stage.enemies.turret, this.stage.bullets, this.tickTimer),
      new MoveReaction(this.character, this.keyManager)
    ];
  }

  initDrawSteps() {
    for (let x = 0; x < Stage.WIDTH; x++) {
      for (let y = 0; y < Stage.HEIGHT; y++) {
        let tile = this.stage.tiles[x][y];
        let tilePoint = new Vector(x * Tile.WIDTH, y * Tile.WIDTH);
        this.drawSteps.push(new DrawEntityAt(this.context, tile, tilePoint));
      }
    }

    this.drawSteps.push(new DrawTurrets(this.context, this.stage.enemies.turret || []));
    this.drawSteps.push(new DrawTurrets(this.context, this.stage.enemies.laser || []));
    this.drawSteps.push(new DrawEntity(this.context, this.character));
    this.drawSteps.push(new DrawBullets(this.context, this.stage));
  }

  update() {
    this.tickTimer.addTick();
    this.currentScore = this.tickTimer.ticks / 60.0;
    this.bestScore = _.max([this.bestScore, this.currentScore]);

    _.forEach(this.updateSteps, (step) => {
      step.apply();
    });

    this.checkPlayerHit.apply();
    if (this.checkPlayerHit.hit) {
      this.reset();
    }
  }

  draw() {
    _.forEach(this.drawSteps, (step) => {
      step.apply();
    });

    let scoreStr = _.round(this.currentScore, 1).toFixed(1);
    DrawText.apply(this.context, scoreStr, new Vector(36, 22), 'white');

    let lastScoreStr = _.round(this.lastScore, 1).toFixed(1);
    DrawText.apply(this.context, lastScoreStr, new Vector(100, 22), 'green');

    let bestScoreStr = _.round(this.bestScore, 1).toFixed(1);
    DrawText.apply(this.context, bestScoreStr, new Vector(200, 22), 'red');
  }
}
