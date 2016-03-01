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

  copy() {
    return new Point(this.x, this.y);
  }

  xy() {
    return [this.x, this.y];
  }
}

export {Point as default};
