import getImageBounds from 'js/trial/services/get-image-bounds';

import Vector from 'js/common/vector';

const IMAGE_PATHS = {
  STAND: 'res/trial/character.png',
  CROUCH: 'res/trial/crouch.png'
};

export default class Character {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;
    _.forEach(IMAGE_PATHS, (value) => {
      assetManager.loadImage(value);
    })

    Character.assetManager.onLoad(() => {
      this.images = _.mapValues(IMAGE_PATHS, (path) => {
        return Character.assetManager.get(path);
      });

      this.bounds = _.mapValues(this.images, (image) => {
        return getImageBounds(image);
      });
    });
  }

  constructor(spawn) {
    this.respawn(spawn);
    this.isGrounded = false;
    this.fastFall = false;
    this.isCrouch = false;
  }

  respawn(point) {
    this.pos = point.copy();
    this.velo = new Vector(0, 0);
  }

  hitGround() {
    this.fastFall = false;
    this.isGrounded = true;
  }

  get imageState() {
    if (this.isCrouch) {
      return 'CROUCH';
    } else {
      return 'STAND';
    }
  }

  get bounds() {
    return Character.bounds[this.imageState];
  }

  get image() {
    return Character.images[this.imageState];
  }

  getRelativeDrawCorner() {
    return new Vector(-this.image.width / 2, -this.image.height);
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

  getBound(isMaxX, isMaxY) {
    return this.getRawBound(isMaxX, isMaxY).addM(this.getDrawCorner());
  }
}
