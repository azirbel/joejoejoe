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
    this.isGrounded = false;
    Character.assetManager.onLoad(() => {
      this.image = Character.assetManager.get(STICK_SHEET);
      this.bounds = getImageBounds(this.image);
    });
  }

  respawn(point) {
    this.pos = point.copy();
    this.velo = new Point(0, 0);
  }

  getImage() {
    return this.image;
  }

  getRelativeDrawCorner() {
    return new Point(-this.getImage().width / 2, -this.getImage().height);
  }

  getDrawCorner() {
    return this.pos.add(this.getRelativeDrawCorner());
  }

  getMinXBound() {
    return this.bounds[0];
  }

  getMaxXBound() {
    return this.bounds[1];
  }

  getMinYBound() {
    return this.bounds[2];
  }

  getMaxYBound() {
    return this.bounds[3];
  }

  getRawBound(isMaxX, isMaxY) {
    let xBound = isMaxX ? this.getMaxXBound() : this.getMinXBound();
    let yBound = isMaxY ? this.getMaxYBound() : this.getMinYBound();
    return new Point(xBound, yBound);
  }

  getRelativeBound(isMaxX, isMaxY) {
    return this.getRawBound(isMaxX, isMaxY).addM(this.getRelativeDrawCorner());
  }

  getBound(isMaxX, isMaxY) {
    return this.getRawBound(isMaxX, isMaxY).addM(this.getDrawCorner());
  }
}

export { Character as default }
