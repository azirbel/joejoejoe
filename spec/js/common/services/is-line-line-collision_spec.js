import isLineLineCollision from 'js/common/services/is-line-line-collision';
import Vector from 'js/common/vector';

describe('isLineLineCollision', () => {
  it('orthogonal', () => {
    let A = new Vector(-1, 0);
    let B = new Vector(1, 0);

    let C = new Vector(0, 1);
    let D = new Vector(0, -1);

    expect(isLineLineCollision(A, B, C, D)).to.equal(true);
    expect(isLineLineCollision(B, A, C, D)).to.equal(true);
    expect(isLineLineCollision(A, B, D, C)).to.equal(true);
    expect(isLineLineCollision(B, A, D, C)).to.equal(true);

    expect(isLineLineCollision(A, C, B, D)).to.equal(false);
  });
});
