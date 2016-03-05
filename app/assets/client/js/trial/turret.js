import Vector from 'js/common/vector';

const TEXTURE_BASE_PATH = 'res/turret_base.png';
const TEXTURE_CANNON_PATH = 'res/turret_cannon.png';

class Turret {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;

    this.assetManager.loadAsset(TEXTURE_BASE_PATH);
    this.assetManager.loadAsset(TEXTURE_CANNON_PATH);

    this.assetManager.onLoad(() => {
      let baseImage = this.assetManager.get(TEXTURE_BASE_PATH);
      this.TEXTURE_BASE_IMAGE = baseImage;
      this.BASE_IMAGE_SIZE = new Vector(baseImage.width, baseImage.height);

      let cannonImage = this.assetManager.get(TEXTURE_CANNON_PATH);
      this.TEXTURE_CANNON_IMAGE = cannonImage;
      this.CANON_IMAGE_SIZE = new Vector(cannonImage.width, cannonImage.height);
    });
  }

  constructor(pos) {
    this.pos = pos;
    this.angle = Math.PI / 2;
    this.interval = 45;
    this.bulletSpeed = 2.5;
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

export { Turret as default };
