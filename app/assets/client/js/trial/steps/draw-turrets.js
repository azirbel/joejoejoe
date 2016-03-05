import _ from 'lodash';

export default class {
  constructor(context, stage) {
    this.context = context;
    this.stage = stage;
  }

  apply() {
    _.forEach(this.stage.turrets, (turret) => {
      let [baseX, baseY] = turret.getDrawCorner().xy();
      let baseImage = turret.getBaseImage();
      this.context.drawImage(baseImage, baseX, baseY);

      let cannonImage = turret.getCannonImage();

      let [posX, posY] = turret.pos.xy();
      let [cannonX, cannonY] = turret.getCannonImageSize().mult(-0.5).xy();

      this.context.translate(posX, posY);
      this.context.rotate(turret.angle);
      this.context.drawImage(cannonImage, cannonX, cannonY);
      this.context.rotate(-turret.angle);
      this.context.translate(-posX, -posY);
    });
  }
}
