import _ from 'lodash';

import { getRayCollision } from 'js/trial/services/cast-ray';

export default class DrawLasers {
  static apply(context, turrets, stage) {
    _.forEach(turrets, (turret) => {
      if (turret.laserState === 'waiting') {
        return;
      }

      let dir = turret.target.sub(turret.pos);
      let rootStart = turret.pos.add(dir.norm().multM(14));

      let ortho = dir.norm().turn();

      let strokeStyles = turret.laserState === 'charging' ?
        ['orange'] : ['yellow', 'orange', 'red'];
      context.lineWidth = turret.laserState === 'charging' ?
        0.5 : 1.4;

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

  constructor(context, turrets, stage) {
    this.context = context;
    this.turrets = turrets;
    this.stage = stage;
  }

  apply() {
    DrawLasers.apply(this.context, this.turrets, this.stage);
  }
}
