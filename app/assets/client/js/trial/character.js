import getImageBounds from 'js/trial/services/get-image-bounds'

import Point from 'js/common/point'

const STICK_SHEET = 'res/stick.png';

class Character {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;
    assetManager.loadAsset(STICK_SHEET);
  }

  constructor() {
    this.respawn(new Point(100, 100));
    Character.assetManager.onLoad(() => {
      this.image = Character.assetManager.get(STICK_SHEET);
      this.imageBounds = getImageBounds(this.image);
    });
  }

  respawn(point) {
    this.pos = point.copy();
    this.velo = new Point(0, 0);
  }

  getImage() {
    return this.image;
  }

  getDrawCorner() {
    return this.pos.sub(new Point(this.getImage().width / 2, this.getImage().height));
  }
}

export { Character as default }
