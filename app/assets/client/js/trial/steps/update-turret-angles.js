import _ from 'lodash';

import Vector from 'js/common/vector';

export default class UpdateTurretAngles {
  constructor(stage, character) {
    this.stage = stage;
    this.character = character;
  }

  apply() {
    let charMid = this.character.pos.sub(new Vector(0, this.character.getImage().height / 2));

    _.forEach(this.stage.turrets, (turret) => {
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
}
