import _ from 'lodash';

import Bullet from 'js/trial/bullet';

export default class {
  constructor(character, stage) {
    this.character = character;
    this.stage = stage;
    this.hit = false;
  }

  apply() {
    _.forEach(this.stage.bullets, (bullet) => {
      let bulletMin = bullet.getDrawCorner();
      let bulletMax = bulletMin.add(Bullet.BULLET_IMAGE_SIZE);

      let playerMin = this.character.getBound(false, false);
      let playerMax = this.character.getBound(true, true);

      if (bulletMin.x > playerMax.x || bulletMin.y > playerMax.y) {
        return;
      }
      if (bulletMax.x < playerMin.x || bulletMax.y < playerMin.y) {
        return;
      }

      this.hit = true;
    });
  }
}
