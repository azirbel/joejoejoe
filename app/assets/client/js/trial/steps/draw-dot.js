const RADIUS = 2;

export default class DrawDot {
  constructor(context, posFunc, fillStyle = 'black') {
    this.context = context;
    this.posFunc = posFunc;
    this.fillStyle = fillStyle;
  }

  apply() {
    let [x, y] = this.posFunc().xy();

    this.context.beginPath();
    this.context.arc(x, y, RADIUS, 0, 2 * Math.PI, false);
    this.context.endPath();
    this.context.fillStyle = this.fillStyle;
    this.context.fill();
  }
}
