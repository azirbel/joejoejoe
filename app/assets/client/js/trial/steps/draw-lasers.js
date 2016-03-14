import _ from 'lodash';

import Vector from 'js/common/vector';
import { getRayCollision } from 'js/trial/services/cast-ray';

export default class DrawLasers {
  static apply(context, turrets, character, stage) {
    _.forEach(turrets, (turret) => {
      let charMid = character.pos.sub(new Vector(0, character.getImage().height / 2));
      let dir = charMid.sub(turret.pos);

      let rootStart = turret.pos.add(dir.norm().multM(14));

      context.lineWidth = 1.4;
      let ortho = dir.norm().turn();

      let strokeStyles = ['yellow', 'orange', 'red'];
      _.times(strokeStyles.length, (index) => {
        context.strokeStyle = strokeStyles[strokeStyles.length - index - 1];

        let offset = (index + 0.5) * 1.2;
        let deltas = [ortho.mult(offset), ortho.mult(-offset)];

        _.forEach(deltas, (delta) => {
          let curStart = rootStart.add(delta);
          let [endX, endY] = getRayCollision(curStart, dir, stage).xy();

          let [startX, startY] = curStart.xy();
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.stroke();
        });
      });
    });
  }

  constructor(context, turrets, character, stage) {
    this.context = context;
    this.turrets = turrets;
    this.character = character;
    this.stage = stage;
  }

  apply() {
    DrawLasers.apply(this.context, this.turrets, this.character, this.stage);
  }
}
