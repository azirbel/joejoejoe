export default function isLineLineCollision(s0, e0, s1, e1) {
  let v0 = e0.sub(s0);
  let v1 = e1.sub(s1);

  let denom = v0.y * v1.x - v0.x * v1.y;
  if (denom === 0) {
    return false;
  }

  let n0 = (v0.x * (s1.y - s0.y) - v0.y * (s1.x - s0.x)) / denom;
  if (n0 < 0 || n0 > 1) {
    return false;
  }

  let n1 = (v1.x * (s1.y - s0.y) - v1.y * (s1.x - s0.x)) / denom;
  if (n1 < 0 || n1 > 1) {
    return false;
  }

  return true;
}
