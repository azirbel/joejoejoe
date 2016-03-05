import Vector from 'js/common/vector';

const TEXTURE_BULLET_PATH = 'res/bullet.png';

class Bullet {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;

    this.assetManager.loadAsset(TEXTURE_BULLET_PATH);

    this.assetManager.onLoad(() => {
      let bulletImage = this.assetManager.get(TEXTURE_BULLET_PATH);
      this.TEXTURE_BULLET_IMAGE = bulletImage;
      this.BULLET_IMAGE_SIZE = new Vector(bulletImage.width, bulletImage.height);
    });
  }

  constructor(pos, velo) {
    this.pos = pos;
    this.velo = velo;
  }

  getRelativeDrawCorner() {
    return Bullet.BULLET_IMAGE_SIZE.mult(-0.5);
  }

  getDrawCorner() {
    return this.pos.add(this.getRelativeDrawCorner());
  }

  getImage() {
    return Bullet.TEXTURE_BULLET_IMAGE;
  }
}

export { Bullet as default };
