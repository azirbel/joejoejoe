export default class {
  constructor(entity, gravityFactor) {
    this.entity = entity;
    this.gravityFactor = gravityFactor;
  }

  apply() {
    this.entity.vy -= this.gravityFactor;
  }
}
