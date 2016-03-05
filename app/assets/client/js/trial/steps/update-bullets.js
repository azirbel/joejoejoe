import _ from 'lodash';

import Tile from 'js/trial/tile';

import ApplyVelocity from 'js/trial/steps/apply-velocity';

export default class UpdateBullets {
  constructor(stage) {
    this.stage = stage;
  }

  apply() {
    _.forEach(this.stage.bullets, (bullet) => {
      ApplyVelocity.apply(bullet);
    });

    let isBulletOutOfBoundsFunc = (bullet) => {
      let xTile = _.floor(bullet.pos.x / Tile.WIDTH);
      let yTile = _.floor(bullet.pos.y / Tile.HEIGHT);

      return this.stage.isWall(xTile, yTile);
    };

    _.remove(this.stage.bullets, isBulletOutOfBoundsFunc);
  }
}
