import _ from 'lodash'

import entityPoint from 'js/trial/services/entity-point'

import Point from 'js/common/point'

import ApplyKeypress from 'js/trial/steps/apply-keypress'
import MoveCharacter from 'js/trial/steps/move-character'
import DrawEntity from 'js/trial/steps/draw-entity'
import DrawEntityAt from 'js/trial/steps/draw-entity-at'
import DrawDot from 'js/trial/steps/draw-dot'

import Character from 'js/trial/character'
import Stage from 'js/trial/stage'
import Tile from 'js/trial/tile'
import StageBuilder from 'js/trial/stage-builder'

const LEFT = 65;
const RIGHT = 68;
const UP = 87;
const DOWN = 83;

const CONSUMED_KEYS = [LEFT, RIGHT, UP, DOWN];

export default class {
  constructor(context) {
    this.context = context;
    this.character = new Character();

    this.stage = StageBuilder.buildStage(1);

    this.updateSteps = [];
    this.drawSteps = [];

    this.pressedMapping = {}

    this.initUpdateSteps();
    this.initDrawSteps();
  }

  acceptKeyEvent(key, isPress) {
    console.log(key, isPress);

    if(_.includes(CONSUMED_KEYS, key)) {
      this.pressedMapping[key] = isPress;
      return false;
    }
  }

  initUpdateSteps() {
    this.updateSteps.push(new ApplyKeypress(this.character, this.pressedMapping));
    this.updateSteps.push(new MoveCharacter(this.character, this.stage));
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
