class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(point) {
    return new Point(this.x + point.x, this.y, point.y);
  }

  addM(point) {
    this.x += point.x;
    this.y += point.y;

    return this;
  }

  sub(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  subM(point) {
    this.x -= point.x;
    this.y -= point.y;

    return this;
  }

  mult(factor) {
    return new Point(this.x * factor, this.y * factor);
  }

  multM(factor) {
    this.x *= factor;
    this.y *= factor;

    return this;
  }

  neg() {
    return mult(-1);
  }

  negM() {
    return multM(-1);
  }

  copy() {
    return new Point(this.x, this.y);
  }

  xy() {
    return [this.x, this.y];
  }
}

export {Point as default};
