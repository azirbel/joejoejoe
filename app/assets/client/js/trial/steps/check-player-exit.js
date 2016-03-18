import _ from 'lodash';

import Vector from 'js/common/vector';
import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';

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
    let pos = this.character.pos;

    this.isExit = false;
    _.forEach(this.exitTiles, (tilePos) => {
      if (pos.x < tilePos.x || pos.x > tilePos.x + Tile.WIDTH) {
        return;
      }
      if (pos.y < tilePos.y || pos.y > tilePos.y + Tile.HEIGHT) {
        return;
      }

      this.isExit = true;
    });
  }
}
