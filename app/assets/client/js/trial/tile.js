const WALL_TILE = 'res/wall.png';
const BACK_TILE = 'res/back.png';

class Tile {
  static loadAssets(assetManager) {
    this.WIDTH = 32;
    this.HEIGHT = 32;
    this.assetManager = assetManager;

    assetManager.loadAsset(WALL_TILE);
    assetManager.loadAsset(BACK_TILE);

    this.wallTile = new Tile();
    this.backTile = new Tile();

    assetManager.onLoad(() => {
      this.wallTile.image = assetManager.get(WALL_TILE);
      this.backTile.image = assetManager.get(BACK_TILE);
    });
  }

  constructor() {
    this.image = null;
  }

  getImage() {
    return this.image;
  }
}

export { Tile as default };
