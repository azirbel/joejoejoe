import _ from 'lodash';

import Tile from 'js/trial/tile';

import ApplyVelocity from 'js/trial/steps/apply-velocity';

export default class UpdateBullets {
  constructor(stage, bullets) {
    this.stage = stage;
    this.bullets = bullets;
  }

  apply() {
    _.forEach(this.bullets, (bullet) => {
      ApplyVelocity.apply(bullet);
    });

    let isBulletOutOfBoundsFunc = (bullet) => {
      let xTile = _.floor(bullet.pos.x / Tile.WIDTH);
      let yTile = _.floor(bullet.pos.y / Tile.HEIGHT);

      return this.stage.isWall(xTile, yTile);
    };

    _.remove(this.bullets, isBulletOutOfBoundsFunc);
  }
}
