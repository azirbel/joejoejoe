const WALL_TILE_PATH = 'res/wall.png';
const BACK_TILE_PATH = 'res/back.png';

export default class Tile {
  static loadAssets(assetManager) {
    this.WIDTH = 32;
    this.HEIGHT = 32;
    this.assetManager = assetManager;

    assetManager.loadAsset(WALL_TILE_PATH);
    assetManager.loadAsset(BACK_TILE_PATH);

    assetManager.onLoad(() => {
      this.wallTile.image = assetManager.get(WALL_TILE_PATH);
      this.backTile.image = assetManager.get(BACK_TILE_PATH);
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
