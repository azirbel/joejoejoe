import getImageBounds from 'js/trial/services/get-image-bounds';

import Vector from 'js/common/vector';

const STICK_SHEET = 'res/trial/character.png';

export default class Character {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;
    assetManager.loadImage(STICK_SHEET);
  }

  constructor(spawn) {
    this.respawn(spawn);
    this.isGrounded = false;
    this.fastFall = false;
    Character.assetManager.onLoad(() => {
      this.image = Character.assetManager.get(STICK_SHEET);
      this.bounds = getImageBounds(this.image);
    });
  }

  respawn(point) {
    this.pos = point.copy();
    this.velo = new Vector(0, 0);
  }

  hitGround() {
    this.fastFall = false;
    this.isGrounded = true;
  }

  getImage() {
    return this.image;
  }

  getRelativeDrawCorner() {
    return new Vector(-this.getImage().width / 2, -this.getImage().height);
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
    return new Vector(xBound, yBound);
  }

  getRelativeBound(isMaxX, isMaxY) {
    return this.getRawBound(isMaxX, isMaxY).addM(this.getRelativeDrawCorner());
  }

  getBound(isMaxX, isMaxY) {
    return this.getRawBound(isMaxX, isMaxY).addM(this.getDrawCorner());
  }
}
