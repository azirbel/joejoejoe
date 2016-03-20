import _ from 'lodash';

import Vector from 'js/common/vector';
import TickTimer from 'js/common/tick-timer';

import ApplyKeypress from 'js/trial/steps/apply-keypress';
import MoveCharacter from 'js/trial/steps/move-character';
import UpdateTurretAngles from 'js/trial/steps/update-turret-angles';
import UpdateLaserTurrets from 'js/trial/steps/update-laser-turrets';
import CreateBullets from 'js/trial/steps/create-bullets';
import UpdateBullets from 'js/trial/steps/update-bullets';
import CheckPlayerHit from 'js/trial/steps/check-player-hit';
import CheckPlayerExit from 'js/trial/steps/check-player-exit';
import CheckStarted from 'js/trial/steps/check-started';
import KeepState from 'js/trial/steps/keep-state';
import MoveReaction from 'js/trial/steps/move-reaction';

import DrawEntity from 'js/trial/steps/draw-entity';
import DrawEntityAt from 'js/trial/steps/draw-entity-at';
import DrawExitTileAt from 'js/trial/steps/draw-exit-tile-at';
import DrawStartTileAt from 'js/trial/steps/draw-start-tile-at';
import DrawTurrets from 'js/trial/steps/draw-turrets';
import DrawBullets from 'js/trial/steps/draw-bullets';
import DrawText from 'js/trial/steps/draw-text';
import DrawLasers from 'js/trial/steps/draw-lasers';

import Character from 'js/trial/character';
import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';
import StageBuilder from 'js/trial/parse/stage-builder';

export default class InGame {
  constructor(context, keyManager) {
    this.context = context;
    this.keyManager = keyManager;

    this.requiredTime = 5.0;
  }

  reset() {
    this.currentTime = this.requiredTime;

    this.tickTimer = new TickTimer();

    this.stage = StageBuilder.buildStage(3);
    this.stage.isStarted = false;
    this.character = new Character(this.stage.getSpawnVect());
    KeepState.apply(this.character);

    this.updateSteps = [];
    this.drawSteps = [];

    this.initUpdateSteps();
    this.checkPlayerHit = new CheckPlayerHit(this.character, this.stage);
    this.checkPlayerExit = new CheckPlayerExit(this.character, this.stage);
    this.initDrawSteps();

    this.runPreUpdateSteps();
  }

  runPreUpdateSteps() {
    UpdateTurretAngles.apply(this.stage.enemies.turret || [], this.character);
    UpdateLaserTurrets.apply(this.stage.enemies.laser || [], this.character, this.tickTimer);
    CreateBullets.apply(this.stage.enemies.turret, this.stage.bullets, this.tickTimer);
  }

  initUpdateSteps() {
    this.checkStartedStep = new CheckStarted(this.character, this.stage);

    this.preStartedSteps = [
      new KeepState(this.character),
      new ApplyKeypress(this.character, this.keyManager, this.stage),
      new MoveCharacter(this.character, this.stage),
      new UpdateTurretAngles(this.stage.enemies.turret || [], this.character),
      new MoveReaction(this.character, this.keyManager)
    ];

    this.updateSteps = [
      new KeepState(this.character),
      new ApplyKeypress(this.character, this.keyManager, this.stage),
      new MoveCharacter(this.character, this.stage),
      new UpdateTurretAngles(this.stage.enemies.turret || [], this.character),
      new UpdateLaserTurrets(this.stage.enemies.laser || [], this.character, this.tickTimer),
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
        if (tile === Tile.exitTile) {
          this.drawSteps.push(new DrawExitTileAt(this.context, tile, tilePoint, this.stage));
        } else if (_.includes([Tile.startTile, Tile.startWallTile], tile))  {
          this.drawSteps.push(new DrawStartTileAt(this.context, tile, tilePoint, this.stage));
        } else {
          this.drawSteps.push(new DrawEntityAt(this.context, tile, tilePoint));
        }
      }
    }

    this.drawSteps.push(new DrawTurrets(this.context, this.stage.enemies.turret || []));
    this.drawSteps.push(new DrawTurrets(this.context, this.stage.enemies.laser || []));
    this.drawSteps.push(new DrawEntity(this.context, this.character));
    this.drawSteps.push(new DrawBullets(this.context, this.stage));
    this.drawSteps.push(new DrawLasers(this.context, this.stage.enemies.laser, this.stage));
  }

  update() {
    if (!this.stage.isStarted) {
      this.checkStartedStep.apply();

      this.stage.isStarted = this.checkStartedStep.isStarted;

      if (!this.stage.isStarted) {
        _.forEach(this.preStartedSteps, (step) => {
          step.apply();
        });

        return;
      }
    }

    this.tickTimer.addTick();
    this.currentTime = _.max([this.requiredTime - this.tickTimer.ticks / 60.0, 0]);

    if (this.currentTime <= 0) {
      this.stage.isExitable = true;
    }

    _.forEach(this.updateSteps, (step) => {
      step.apply();
    });

    this.checkPlayerHit.apply();
    if (this.checkPlayerHit.hit) {
      this.reset();
    }

    this.checkPlayerExit.apply();
    if (this.checkPlayerExit.isExit) {
      //TODO: next level
      this.reset();
    }
  }

  draw() {
    _.forEach(this.drawSteps, (step) => {
      step.apply();
    });

    let currentTimeStr = _.round(this.currentTime, 1).toFixed(1);
    DrawText.apply(this.context, currentTimeStr, new Vector(36, 22), 'white');
  }
}
