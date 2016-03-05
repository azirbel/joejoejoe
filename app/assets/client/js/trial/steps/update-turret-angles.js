import _ from 'lodash';

export default class {
  constructor(stage, character) {
    this.stage = stage;
    this.character = character;
  }

  apply() {
    _.forEach(this.stage.turrets, (turret) => {
      let vect = turret.pos.sub(this.character.pos);
      if (vect.x == 0 && vect.y == 0) {
        return;
      }

      turret.angle = Math.atan2(vect.y, vect.x);
    });
  }
}
