import _ from 'lodash';

import Tile from 'js/trial/tile';
import Vector from 'js/common/vector';

const STAGE_WIDTH = 20;
const STAGE_HEIGHT = 20;

export default class Stage {
  static get WIDTH() {
    return STAGE_WIDTH;
  }

  static get HEIGHT() {
    return STAGE_WIDTH;
  }

  static loadAssets(assetManager) {
    this.assetManager = assetManager;
  }

  constructor(tiles, enemies, spawn) {
    this.tiles = tiles;
    this.enemies = enemies;
    this.spawn = spawn;
    this.isStarted = false;

    this.bullets = [];
    this.isExitable = false;
  }

  get(x, y) {
    if (x < 0 || x >= STAGE_WIDTH || y < 0 || y >= STAGE_HEIGHT) {
      return Tile.wallTile;
    }

    return this.tiles[x][y];
  }

  isWall(x, y) {
    let tile = this.get(x, y);
    return tile == Tile.wallTile ||
      !this.isExitable && tile == Tile.exitTile ||
      this.isStarted && _.includes([Tile.startTile, Tile.startWallTile], tile);
  }

  getSpawnVect() {
    return new Vector((this.spawn.x + 0.5) * Tile.WIDTH, (this.spawn.y + 1) * Tile.HEIGHT);
  }
}
