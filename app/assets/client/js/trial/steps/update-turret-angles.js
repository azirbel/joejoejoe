import _ from 'lodash';

import Vector from 'js/common/vector';
import setTurretAngle from 'js/trial/services/set-turret-angle';

export default class UpdateTurretAngles {
  static apply(turrets, character) {
    let charMid = character.pos.sub(new Vector(0, character.getImage().height / 2));

    _.forEach(turrets, (turret) => {
      setTurretAngle(turret, charMid);
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
