export default class DrawEntity {
  static apply(context, entity) {
    let [x, y] = entity.getDrawCorner().xy();
    let image = entity.getImage();

    context.drawImage(image, x, y);
  }

  constructor(context, entity) {
    this.context = context;
    this.entity = entity;
  }

  apply() {
    DrawEntity.apply(this.context, this.entity);
  }
}
