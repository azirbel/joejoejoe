import _ from 'lodash'

import ApplyGravity from 'js/trial/steps/apply-gravity'
import ApplyVelocity from 'js/trial/steps/apply-velocity'

import DrawEntity from 'js/trial/steps/draw-entity'

const CHARACTER_GRAVITY = -0.01;

export default class {
  constructor(context, character) {
    this.context = context;
    this.character = character;

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
    this.drawSteps.push(new DrawEntity(this.context, this.character));
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
