export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  addM(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  sub(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  subM(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

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

  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  length() {
    return Math.sqrt(this.dot(this));
  }

  norm() {
    return this.mult(1 / this.length());
  }

  turn() {
    return new Vector(this.y, -this.x);
  }

  xy() {
    return [this.x, this.y];
  }
}
