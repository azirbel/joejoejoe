const STICK_SHEET = 'res/stick.png';

class Character {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;
    assetManager.loadAsset(STICK_SHEET);
  }

  constructor() {
    this.respawn(100, 100);
    Character.assetManager.onLoad(() => {
      this.image = Character.assetManager.get(STICK_SHEET);
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
    return [this.x - this.getImage().width / 2, this.y - this.getImage().height];
  }
}

export { Character as default }
