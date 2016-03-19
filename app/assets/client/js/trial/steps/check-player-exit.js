import _ from 'lodash';

import Vector from 'js/common/vector';
import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';

let sign = (number) => {
  if (number > 0) {
    return 1;
  } else if (number < 0) {
    return -1;
  } else {
    return 0;
  }
};

export default class CheckPlayerHit {
  constructor(character, stage) {
    this.character = character;
    this.exitTiles = [];
    this.isExit = false;

    for (let x = 0; x < Stage.WIDTH; x++) {
      for (let y = 0; y < Stage.HEIGHT; y++) {
        let tile = stage.tiles[x][y];
        if (tile == Tile.exitTile) {
          this.exitTiles.push(new Vector(x * Tile.WIDTH, y * Tile.HEIGHT));
        }
      }
    }
  }

  apply() {
    let oldX = this.character.oldState.pos.x;
    let newPos = this.character.pos;

    this.isExit = false;
    _.forEach(this.exitTiles, (tilePos) => {
      if (newPos.y < tilePos.y || newPos.y > tilePos.y + Tile.HEIGHT) {
        return;
      }

      let tileMid = tilePos.x + Tile.WIDTH / 2;
      let oldSign = sign(tileMid - oldX);
      let newSign = sign(tileMid - newPos.x);

      if (oldSign !== newSign) {
        this.isExit = true;
      }
    });
  }
}
