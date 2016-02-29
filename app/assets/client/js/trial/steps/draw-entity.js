export default class {
  constructor(context, entity) {
    this.context = context;
    this.entity = entity;
  }

  apply() {
    let [x, y] = this.entity.getDrawCorner();
    let image = this.entity.getImage();

    this.context.drawImage(image, x, y);
  }
}
