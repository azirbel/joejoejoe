import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';

export default class {
  static buildStage(level) {
    switch (level) {
      case 1: {
        return this.buildStage1();
      }
      default: {
        throw 'Could not build unknown level: ' + level;
      }
    }
  }

  static buildStage1() {
    let stage = new Stage();
    this.setBounds(stage);

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6 - x; y++) {
        stage.tiles[x][19 - y] = Tile.wallTile;
      }
    }

    for (let x = 12; x < 17; x++) {
      stage.tiles[x][15] = Tile.wallTile;
    }

    for (let x = 7; x < 11; x++) {
      stage.tiles[x][11] = Tile.wallTile;
    }

    for (let x = 11; x < 17; x++) {
      stage.tiles[x][6] = Tile.wallTile;
    }

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
