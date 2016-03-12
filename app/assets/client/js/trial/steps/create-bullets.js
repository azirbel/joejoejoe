import _ from 'lodash';

import Vector from 'js/common/vector';

import Bullet from 'js/trial/bullet';

export default class CreateBullets {
  static apply(turrets, bullets, timer) {
    _.forEach(turrets, (turret) => {
      if (timer.isOnInterval(turret.interval, turret.timeOffset)) {
        let bulletVect = new Vector(Math.cos(turret.angle), Math.sin(turret.angle));
        bulletVect.multM(turret.bulletSpeed);

        bullets.push(new Bullet(turret.pos.copy(), bulletVect));
      }
    });
  }

  constructor(turrets, bullets, timer) {
    this.turrets = turrets;
    this.bullets = bullets;
    this.timer = timer;
  }

  apply() {
    CreateBullets.apply(this.turrets, this.bullets, this.timer);
  }
}
