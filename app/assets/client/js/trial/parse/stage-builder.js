import _ from 'lodash';

import StageParser from 'js/trial/parse/stage-parser';

let getStagePath = (name) => {
  return 'res/trial/stages/' + name +'.stage';
};

let STAGE_NAMES = ['1', '2', '3', 'empty'];

export default class StageBuilder {
  static loadAssets(assetManager) {
    this.assetManager = assetManager;
    _.forEach(STAGE_NAMES, (rawName) => {
      let stagePath = getStagePath(rawName);

      this.assetManager.loadAsset(stagePath);
    });
  }

  static buildStage(level) {
    let stagePath = getStagePath(level);
    let rawStage = this.assetManager.get(stagePath);

    return StageParser.parse(rawStage);
  }
}
