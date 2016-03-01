export default class {
  constructor(entity, gravityFactor) {
    this.entity = entity;
    this.gravityFactor = gravityFactor;
  }

  apply() {
    this.entity.velo.addM(this.gravityFactor);
  }
}
