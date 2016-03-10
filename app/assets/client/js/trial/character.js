import _ from 'lodash';

import getImageBounds from 'js/trial/services/get-image-bounds';
import imageToSprites from 'js/common/image-to-sprites';

import Vector from 'js/common/vector';

const SPRITE_PATH = 'res/trial/character.png';

const STATE_INDICES = [
  'STAND',
  'CROUCH'
];

let getImagePositionOffset = (image) => {
  return new Vector(-image.width / 2, -image.height);
};

export default class Character {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;
    assetManager.loadImage(SPRITE_PATH);

    Character.assetManager.onLoad(() => {
      let spriteSheet = Character.assetManager.get(SPRITE_PATH);

      let sprites = imageToSprites(spriteSheet, 32, 64);
      let STAND_IMAGE = sprites[0][0];
      let CROUCH_IMAGE = sprites[0][1];

      this.images = {
        CROUCH: CROUCH_IMAGE,
        STAND: STAND_IMAGE
      };

      this.bounds = _.mapValues(this.images, (image) => {
        let imageBounds = getImageBounds(image);
        let dy = getImagePositionOffset(image).xy()[1];
        return [
          -9,
          9,
          imageBounds[2] + dy,
          imageBounds[3] + dy + 1
        ];
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

  get state() {
    if (this.isCrouch) {
      return 'CROUCH';
    } else {
      return 'STAND';
    }
  }

  getBounds() {
    return Character.bounds[this.state];
  }

  getImage() {
    return Character.images[this.state];
  }

  getDrawCorner() {
    return this.pos.add(getImagePositionOffset(this.getImage()));
  }

  getMinXBound() {
    return this.getBounds()[0];
  }

  getMaxXBound() {
    return this.getBounds()[1];
  }

  getMinYBound() {
    return this.getBounds()[2];
  }

  getMaxYBound() {
    return this.getBounds()[3];
  }

  getRawBound(isMaxX, isMaxY) {
    let xBound = isMaxX ? this.getMaxXBound() : this.getMinXBound();
    let yBound = isMaxY ? this.getMaxYBound() : this.getMinYBound();
    return new Vector(xBound, yBound);
  }

  getBound(isMaxX, isMaxY) {
    return this.getRawBound(isMaxX, isMaxY).addM(this.pos);
  }
}
