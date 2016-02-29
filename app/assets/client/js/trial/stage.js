const STAGE_WIDTH = 20;
const STAGE_HEIGHT = 20;

import Tile from 'js/trial/tile'

class Stage {
  static loadAssets(assetManager) {
    this.WIDTH = STAGE_WIDTH;
    this.HEIGHT = STAGE_HEIGHT;

    this.assetManager = assetManager;
  }

  constructor() {
    this.tiles = _.times(STAGE_WIDTH, () => {
      return _.times(STAGE_HEIGHT, () => {
        return Tile.backTile;
      });
    });
  }
}

export { Stage as default }
