export default class DrawEntityAt {
  constructor(context, entity, point) {
    this.context = context;
    this.entity = entity;
    this.point = point;
  }

  apply() {
    let image = this.entity.getImage();

    this.context.drawImage(image, this.point.x, this.point.y);
  }
}
