export default class DrawStartTileAt {
  constructor(context, tile, point, stage) {
    this.context = context;
    this.tile = tile;
    this.point = point;
    this.stage = stage;
  }

  apply() {
    let image = this.stage.isStarted ? this.tile.image : this.tile.startImage;
    this.context.drawImage(image, this.point.x, this.point.y);
  }
}
