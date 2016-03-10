import imageToSprites from 'js/common/image-to-sprites';

import Animation from 'js/common/animation';
import Vector from 'js/common/vector';

const SPRITE_PATH = 'res/trial/character.png';

let getImagePositionOffset = (image) => {
  return new Vector(-image.width / 2, -image.height);
};

let makeStandFilm = (row) => {
  return [
    [150, row[0]],
    [30, row[1]],
    [150, row[0]],
    [30, row[2]]
  ];
};

let makeCrouchFilm = (row) => {
  return [
    [100, row[0]],
    [3, row[1]]
  ];
};

let makeRollFilm = (row) => {
  return [
    [5, row[0]],
    [5, row[1]],
    [5, row[2]],
    [5, row[3]],
    [5, row[4]],
    [5, row[5]],
    [5, row[6]]
  ];
};

export default class Character {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;
    assetManager.loadImage(SPRITE_PATH);

    Character.assetManager.onLoad(() => {
      let spriteSheet = Character.assetManager.get(SPRITE_PATH);

      let spriteRows = imageToSprites(spriteSheet, 32, 64);

      this.films = {
        STAND: makeStandFilm(spriteRows[0]),
        CROUCH: makeCrouchFilm(spriteRows[1]),
        ROLL: makeRollFilm(spriteRows[2])
      };

      this.bounds = {
        STAND: [-10, 10, -62, 0],
        CROUCH: [-10, 10, -30, 0],
        ROLL: [-10, 10, -30, 0]
      };
    });
  }

  constructor(spawn) {
    this.respawn(spawn);
  }

  advance() {
    this.currentAnimation.advance();
    if (this.currentAnimation.isOver()) {
      if (this.state === 'ROLL') {
        this.isRoll = false;
      }

      this.resetAnimation();
    }
  }

  respawn(point) {
    this.isRight = true;
    this.isGrounded = false;
    this.fastFall = false;
    this.isCrouch = false;
    this.isRoll = false;

    this.pos = point.copy();
    this.velo = new Vector(0, 0);

    this.resetAnimation();
  }

  resetAnimation() {
    this.currentAnimation = new Animation(Character.films[this.state]);
  }

  hitGround() {
    this.fastFall = false;
    this.isGrounded = true;
  }

  get state() {
    if (this.isRoll) {
      return 'ROLL';
    } else if (this.isCrouch) {
      return 'CROUCH';
    } else {
      return 'STAND';
    }
  }

  getBounds() {
    return Character.bounds[this.state];
  }

  getImage() {
    return this.currentAnimation.image[this.isRight ? 0 : 1];
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
