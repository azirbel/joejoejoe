export default class DrawEntityAt {
  constructor(context, entity, point) {
    this.context = context;
    this.entity = entity;
    this.point = point;
  }

  apply() {
    this.context.drawImage(this.entity.getImage(), this.point.x, this.point.y);
  }
}
