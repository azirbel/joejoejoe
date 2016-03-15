import _ from 'lodash';

import Vector from 'js/common/vector';
import setTurretAngle from 'js/trial/services/set-turret-angle';

export default class UpdateLaserTurrets {
  static apply(turrets, character, tickTimer) {
    let charMid = character.pos.sub(new Vector(0, character.getImage().height / 2));

    _.forEach(turrets, (turret) => {
      let laserWaitTime = turret.waitTime;
      let laserShooting = laserWaitTime + turret.chargeTime;
      let laserTotalCycle = laserShooting + turret.shootTime;


      let timeInCycle = tickTimer.getTimeInCycle(laserTotalCycle);
      if (timeInCycle < laserWaitTime) {
        setTurretAngle(turret, charMid);
        turret.target = charMid;
        turret.laserState = 'waiting';
      } else if (timeInCycle >= laserWaitTime && timeInCycle < laserShooting) {
        turret.laserState = 'charging';
      } else {
        turret.laserState = 'shooting';
      }
    });
  }

  constructor(turrets, character, tickTimer) {
    this.turrets = turrets;
    this.character = character;
    this.tickTimer = tickTimer;
  }

  apply() {
    UpdateLaserTurrets.apply(this.turrets, this.character, this.tickTimer);
  }
}
