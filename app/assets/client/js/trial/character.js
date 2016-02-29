const STICK_SHEET = 'res/stick.png';

export default class {
  constructor(assetManager) {
    this.respawn(100, 100);

    assetManager.loadAsset(STICK_SHEET);
    assetManager.onLoad(() => {
      this.image = assetManager.get(STICK_SHEET);
    });
  }

  respawn(x, y) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;
  }

  getImage() {
    return this.image;
  }

  getDrawCorner() {
    return [this.x - this.getImage().width / 2, this.y];
  }
}
