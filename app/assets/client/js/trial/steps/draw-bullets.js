import _ from 'lodash';

import DrawEntity from 'js/trial/steps/draw-entity';

export default class DrawBullets {
  constructor(context, stage) {
    this.context = context;
    this.stage = stage;
  }

  apply() {
    _.forEach(this.stage.bullets, (bullet) => {
      DrawEntity.apply(this.context, bullet);
    });
  }
}
