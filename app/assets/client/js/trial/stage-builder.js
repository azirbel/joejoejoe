import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';
import Turret from 'js/trial/turret';

import Vector from 'js/common/vector';

import StageParser from 'js/trial/stage-parser.js';

let getStagePath = (name) => {
  return 'res/trial/stages/' + name +'.stage';
}

let STAGE_NAMES = ['1'];

export default class StageBuilder {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;
    _.forEach(STAGE_NAMES, (rawName) => {
      let stagePath = getStagePath(rawName);

      this.assetManager.loadAsset(stagePath);
    });
  }

  static buildStage(level) {
    if (level == 'hard') {
        return this.buildStage1();
    }

    let stagePath = getStagePath(level);
    let rawStage = this.assetManager.get(stagePath);

    return StageParser.parse(rawStage);
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

    stage.turrets.push(new Turret(this.getTileMid(5, 5)));
    stage.turrets.push(new Turret(this.getTileMid(10, 7)));
    stage.turrets.push(new Turret(this.getTileMid(6, 18)));
    stage.turrets.push(new Turret(this.getTileMid(17, 13)));
    stage.turrets.push(new Turret(this.getTileMid(18, 3)));
    stage.turrets.push(new Turret(this.getTileMid(18, 18)));

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

  static getTileMid(x, y) {
    return new Vector((x + 0.5) * Tile.WIDTH, (y + 0.5) * Tile.HEIGHT);
  }

  static setBounds(stage, tile = Tile.wallTile) {
    this.setRow(stage, 0, tile);
    this.setRow(stage, Stage.HEIGHT - 1, tile);

    this.setCol(stage, 0, tile);
    this.setCol(stage, Stage.WIDTH - 1, tile);
  }
}
