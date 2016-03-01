export default class {
  constructor(entity) {
    this.entity = entity;
  }

  apply() {
    this.entity.pos.addM(this.entity.velo);
  }
}
