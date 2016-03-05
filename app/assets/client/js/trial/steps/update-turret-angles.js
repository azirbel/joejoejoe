import _ from 'lodash';

import Vector from 'js/common/vector';

export default class UpdateTurretAngles {
  constructor(stage, character) {
    this.stage = stage;
    this.character = character;
  }

  apply() {
    _.forEach(this.stage.turrets, (turret) => {
      let charMid = this.character.pos.sub(new Vector(0, this.character.getImage().height / 2));
      let vect = charMid.sub(turret.pos);
      if (vect.x === 0 && vect.y === 0) {
        return;
      }

      turret.angle = Math.atan2(vect.y, vect.x);
    });
  }
}
