import _ from 'lodash';

import Vector from 'js/common/vector';

import Bullet from 'js/trial/bullet';

class CreateBullets {
  static apply(stage, timer) {
    _.forEach(stage.turrets, (turret) => {
      if (timer.isOnInterval(turret.interval)) {
        let bulletVect = new Vector(Math.cos(turret.angle), Math.sin(turret.angle));
        bulletVect.multM(turret.bulletSpeed);

        stage.bullets.push(new Bullet(turret.pos.copy(), bulletVect));
      }
    });
  }

  constructor(stage, timer) {
    this.stage = stage;
    this.timer = timer;
  }

  apply() {
    CreateBullets.apply(this.stage, this.timer);
  }
}

export { CreateBullets as default };
