import _ from 'lodash';

import Vector from 'js/common/vector';
import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';

import { xToTile, yToTile } from 'js/trial/services/pos-to-tile';

export default class CheckStarted {
  constructor(character, stage) {
    this.character = character;
    this.startTiles = [];
    this.isStarted = false;

    for (let x = 0; x < Stage.WIDTH; x++) {
      for (let y = 0; y < Stage.HEIGHT; y++) {
        let tile = stage.tiles[x][y];
        if (_.includes([Tile.startTile, Tile.startWallTile], tile)) {
          this.startTiles.push(new Vector(x, y));
        }
      }
    }
  }

  apply() {
    let inAny = false;
    let playerMinX = xToTile(this.character.pos.x + this.character.getMinXBound());
    let playerMaxX = xToTile(this.character.pos.x + this.character.getMaxXBound());
    let playerMinY = yToTile(this.character.pos.y + this.character.getMinYBound());
    let playerMaxY = yToTile(this.character.pos.y + this.character.getMaxYBound());

    _.forEach(this.startTiles, (tile) => {
      if (tile.x >= playerMinX &&
          tile.x <= playerMaxX &&
          tile.y >= playerMinY &&
          tile.y <= playerMaxY) {
        inAny = true;
      }
    });

    this.isStarted = !inAny;
  }
}
