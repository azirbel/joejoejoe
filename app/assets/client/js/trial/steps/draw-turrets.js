import _ from 'lodash';

export default class {
  constructor(context, stage) {
    this.context = context;
    this.stage = stage;
  }

  apply() {
    _.forEach(this.stage.turrets, (turret) => {
      let [x, y] = turret.getDrawCorner().xy();
      let baseImage = turret.getBaseImage();
      let cannonImage = turret.getCannonImage();

      this.context.drawImage(baseImage, x, y);
      this.context.drawImage(cannonImage, x, y);
    });
  }
}
