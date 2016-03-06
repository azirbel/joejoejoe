import Tile from 'js/trial/tile';

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

  constructor(tiles, entities) {
    this.tiles = tiles;
    this.turrets = entities;

    this.bullets = [];
  }

  get(x, y) {
    if (x < 0 || x >= STAGE_WIDTH || y < 0 || y >= STAGE_HEIGHT) {
      return Tile.wallTile;
    }

    return this.tiles[x][y];
  }

  isWall(x, y) {
    return this.get(x, y) === Tile.wallTile;
  }
}
