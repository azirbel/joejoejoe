const WALL_TILE_PATH = 'res/wall.png';
const BACK_TILE_PATH = 'res/back.png';
const START_TILE_PATH = 'res/trial/start_tile.png';

export default class Tile {
  static loadAssets(assetManager) {
    this.WIDTH = 32;
    this.HEIGHT = 32;
    this.assetManager = assetManager;

    assetManager.loadImage(WALL_TILE_PATH);
    assetManager.loadImage(BACK_TILE_PATH);
    assetManager.loadImage(START_TILE_PATH);

    assetManager.onLoad(() => {
      this.wallTile.image = assetManager.get(WALL_TILE_PATH);
      this.backTile.image = assetManager.get(BACK_TILE_PATH);
      this.startTile.image = assetManager.get(START_TILE_PATH);
    });
  }

  constructor() {
    this.image = null;
  }

  getImage() {
    return this.image;
  }
}

Tile.wallTile = new Tile();
Tile.backTile = new Tile();
Tile.startTile = new Tile();
