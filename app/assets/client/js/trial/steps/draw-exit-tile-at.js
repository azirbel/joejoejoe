export default class DrawExitTileAt {
  constructor(context, tile, point, stage) {
    this.context = context;
    this.tile = tile;
    this.point = point;
    this.stage = stage;
  }

  apply() {
    let image = this.stage.isExitable ? this.tile.openImage : this.tile.image;
    this.context.drawImage(image, this.point.x, this.point.y);
  }
}
