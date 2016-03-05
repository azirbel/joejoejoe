export default class DrawText {
  static apply(context, text, pos, fillStyle = 'black') {
    context.font = "20px Arial";
    context.fillStyle = fillStyle;
    context.fillText(text, pos.x, pos.y);
  }
}
