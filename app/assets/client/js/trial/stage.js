import _ from 'lodash';
import Tile from 'js/trial/tile';

const STAGE_WIDTH = 20;
const STAGE_HEIGHT = 20;

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

    this.turrets = [];
  }

  get(x, y) {
    if (x < 0 || x >= STAGE_WIDTH || y < 0 || y >= STAGE_HEIGHT) {
      return Tile.wallTile;
    }

    return this.tiles[x][y];
  }

  isWall(x, y) {
    return this.get(x, y) === Tile.wallTile;
  }
}

export { Stage as default };
