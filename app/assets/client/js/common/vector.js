export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(point) {
    return new Vector(this.x + point.x, this.y + point.y);
  }

  addM(point) {
    this.x += point.x;
    this.y += point.y;

    return this;
  }

  sub(point) {
    return new Vector(this.x - point.x, this.y - point.y);
  }

  subM(point) {
    this.x -= point.x;
    this.y -= point.y;

    return this;
  }

  mult(factor) {
    return new Vector(this.x * factor, this.y * factor);
  }

  multM(factor) {
    this.x *= factor;
    this.y *= factor;

    return this;
  }

  neg() {
    return this.mult(-1);
  }

  negM() {
    return this.multM(-1);
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  xy() {
    return [this.x, this.y];
  }
}
