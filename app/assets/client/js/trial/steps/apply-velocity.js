class ApplyVelocity {
  static apply(entity) {
    entity.pos.addM(entity.velo);
  }

  constructor(entity) {
    this.entity = entity;
  }

  apply() {
    ApplyVelocity.apply(this.entity);
  }
}

export { ApplyVelocity as default };
