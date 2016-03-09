import _ from 'lodash';

import Vector from 'js/common/vector';
import getTileMid from 'js/trial/services/get-tile-mid';

const TEXTURE_BASE_PATH = 'res/trial/turret_base.png';
const TEXTURE_CANNON_PATH = 'res/turret_cannon.png';

const DEFAULT_PROPERTIES = {
  interval: [parseInt, 60],
  bulletSpeed: [parseFloat, 2.5],
  timeOffset: [parseInt, 0]
};
const REQUIRED_PROPERTIES = {
  x: parseInt,
  y: parseInt
};

export default class Turret {
  static get DEFAULT_PROPERTIES() {
    return DEFAULT_PROPERTIES;
  }

  static get REQUIRED_PROPERTIES() {
    return REQUIRED_PROPERTIES;
  }

  static loadAssets(assetManager) {
    this.assetManager = assetManager;

    this.assetManager.loadImage(TEXTURE_BASE_PATH);
    this.assetManager.loadImage(TEXTURE_CANNON_PATH);

    this.assetManager.onLoad(() => {
      let baseImage = this.assetManager.get(TEXTURE_BASE_PATH);
      this.TEXTURE_BASE_IMAGE = baseImage;
      this.BASE_IMAGE_SIZE = new Vector(baseImage.width, baseImage.height);

      let cannonImage = this.assetManager.get(TEXTURE_CANNON_PATH);
      this.TEXTURE_CANNON_IMAGE = cannonImage;
      this.CANON_IMAGE_SIZE = new Vector(cannonImage.width, cannonImage.height);
    });
  }

  constructor(options) {
    _.assign(this, DEFAULT_PROPERTIES, options);

    this.pos = getTileMid(this.x, this.y);
    this.angle = Math.PI / 2;
  }

  getRelativeDrawCorner() {
    return Turret.BASE_IMAGE_SIZE.mult(-0.5);
  }

  getDrawCorner() {
    return this.pos.add(this.getRelativeDrawCorner());
  }

  getBaseImage() {
    return Turret.TEXTURE_BASE_IMAGE;
  }

  getCannonImage() {
    return Turret.TEXTURE_CANNON_IMAGE;
  }

  getCannonImageSize() {
    return Turret.CANON_IMAGE_SIZE;
  }
}
