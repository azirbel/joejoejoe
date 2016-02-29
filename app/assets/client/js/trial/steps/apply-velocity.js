export default class {
  constructor(entity) {
    this.entity = entity;
  }

  apply() {
    this.entity.x += this.entity.vx;
    this.entity.y += this.entity.vy;
  }
}
