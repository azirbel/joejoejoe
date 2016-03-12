import _ from 'lodash';

import Vector from 'js/common/vector';

export default class UpdateTurretAngles {
  static apply(turrets, character) {
    let charMid = character.pos.sub(new Vector(0, character.getImage().height / 2));

    _.forEach(turrets, (turret) => {
      if (turret.constAngle != null) {
        turret.angle = turret.constAngle;
      } else {
        let vect = charMid.sub(turret.pos);
        if (vect.x === 0 && vect.y === 0) {
          return;
        }

        turret.angle = Math.atan2(vect.y, vect.x);
      }
    });
  }

  constructor(turrets, character) {
    this.turrets = turrets;
    this.character = character;
  }

  apply() {
    UpdateTurretAngles.apply(this.turrets, this.character);
  }
}
