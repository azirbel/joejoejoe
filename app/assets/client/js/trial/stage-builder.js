import Stage from 'js/trial/stage'
import Tile from 'js/trial/tile'

export default class {
  static buildStage(level) {
    switch (level) {
      case 1: {
        return this.buildStage1();
        break;
      }
      default: {
        throw "Could not build unknown level: " + level;
        break;
      }
    }
  }

  static buildStage1() {
    let stage = new Stage();
    this.setBounds(stage);
    return stage;
  }

  static setRow(stage, row, tile) {
    for (let x = 0; x < Stage.WIDTH; x++) {
      stage.tiles[x][row] = tile;
    }
  }

  static setCol(stage, col, tile) {
    for (let y = 0; y < Stage.HEIGHT; y++) {
      stage.tiles[col][y] = tile;
    }
  }

  static setBounds(stage, tile = Tile.wallTile) {
    this.setRow(stage, 0, tile);
    this.setRow(stage, Stage.HEIGHT - 1, tile);

    this.setCol(stage, 0, tile);
    this.setCol(stage, Stage.WIDTH - 1, tile);
  }
}
