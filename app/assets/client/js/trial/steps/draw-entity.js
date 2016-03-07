export default class DrawEntity {
  static apply(context, entity) {
    let [x, y] = entity.getDrawCorner().xy();
    context.drawImage(entity.image, x, y);
  }

  constructor(context, entity) {
    this.context = context;
    this.entity = entity;
  }

  apply() {
    DrawEntity.apply(this.context, this.entity);
  }
}
