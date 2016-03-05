import Tile from 'js/trial/tile';
import Vector from 'js/common/vector';

const TEXTURE_BASE_PATH = 'res/turret_base.png';
const TEXTURE_CANNON_PATH = 'res/turret_cannon.png';

class Turret {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;

    this.assetManager.loadAsset(TEXTURE_BASE_PATH);
    this.assetManager.loadAsset(TEXTURE_CANNON_PATH);

    this.assetManager.onLoad(() => {
      this.TEXTURE_BASE_IMAGE = this.assetManager.get(TEXTURE_BASE_PATH);
      this.TEXTURE_CANNON_IMAGE = this.assetManager.get(TEXTURE_CANNON_PATH);
    });
  }

  constructor(pos) {
    this.pos = pos;
    this.angle = 0;
  }

  getRelativeDrawCorner() {
    return new Vector(this.getBaseImage().width, this.getBaseImage().height).multM(-0.5);
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
}

export { Turret as default };
