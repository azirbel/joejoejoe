export default class {
  constructor(context, entity, x, y) {
    this.context = context;
    this.entity = entity;
    this.x = x;
    this.y = y;
  }

  apply() {
    let image = this.entity.getImage();

    this.context.drawImage(image, this.x, this.y);
  }
}
