import _ from 'lodash'

import entityPoint from 'js/trial/services/entity-point'

import Point from 'js/common/point'

import ApplyGravity from 'js/trial/steps/apply-gravity'
import ApplyVelocity from 'js/trial/steps/apply-velocity'
import DrawEntity from 'js/trial/steps/draw-entity'
import DrawEntityAt from 'js/trial/steps/draw-entity-at'
import DrawDot from 'js/trial/steps/draw-dot'

import Character from 'js/trial/character'
import Stage from 'js/trial/stage'
import Tile from 'js/trial/tile'
import StageBuilder from 'js/trial/stage-builder'

const CHARACTER_GRAVITY = new Point(0, 0.01);

export default class {
  constructor(context) {
    this.context = context;
    this.character = new Character();

    this.stage = StageBuilder.buildStage(1);

    this.updateSteps = [];
    this.drawSteps = [];

    this.initUpdateSteps();
    this.initDrawSteps();
  }

  initUpdateSteps() {
    this.updateSteps.push(new ApplyGravity(this.character, CHARACTER_GRAVITY));
    this.updateSteps.push(new ApplyVelocity(this.character));
  }

  initDrawSteps() {
    for (let x = 0; x < Stage.WIDTH; x++) {
      for (let y = 0; y < Stage.HEIGHT; y++) {
        let tile = this.stage.tiles[x][y];
        let tilePoint = new Point(x * Tile.WIDTH, y * Tile.WIDTH);
        this.drawSteps.push(new DrawEntityAt(this.context, tile, tilePoint));
      }
    }

    this.drawSteps.push(new DrawEntity(this.context, this.character));

    let posFunc = () => entityPoint(this.character);
    this.drawSteps.push(new DrawDot(this.context, posFunc, 'black'));

    let minminFunc = () => this.character.getBound(false, false);
    this.drawSteps.push(new DrawDot(this.context, minminFunc, 'red'));

    let minmaxFunc = () => this.character.getBound(false, true);
    this.drawSteps.push(new DrawDot(this.context, minmaxFunc, 'blue'));

    let maxminFunc = () => this.character.getBound(true, false);
    this.drawSteps.push(new DrawDot(this.context, maxminFunc, 'green'));

    let maxmaxFunc = () => this.character.getBound(true, true);
    this.drawSteps.push(new DrawDot(this.context, maxmaxFunc, 'yellow'));
  }

  update() {
    _.forEach(this.updateSteps, (step) => {
      step.apply();
    });
  }

  draw() {
    _.forEach(this.drawSteps, (step) => {
      step.apply();
    });
  }
}
