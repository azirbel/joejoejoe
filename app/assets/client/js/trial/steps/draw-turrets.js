import _ from 'lodash';

export default class DrawTurrets {
  constructor(context, turrets) {
    this.context = context;
    this.turrets = turrets;
  }

  apply() {
    _.forEach(this.turrets, (turret) => {
      let [baseX, baseY] = turret.getDrawCorner().xy();
      let baseImage = turret.getBaseImage();
      this.context.drawImage(baseImage, baseX, baseY);

      let cannonImage = turret.getCannonImage();

      let [posX, posY] = turret.pos.xy();
      let [cannonX, cannonY] = turret.getCannonImageSize().mult(-0.5).xy();

      let newAngle = turret.angle + Math.PI / 2;
      this.context.translate(posX, posY);
      this.context.rotate(newAngle);
      this.context.drawImage(cannonImage, cannonX, cannonY);
      this.context.rotate(-newAngle);
      this.context.translate(-posX, -posY);
    });
  }
}
