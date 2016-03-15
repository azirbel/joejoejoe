export default function(turret, target) {
  if (turret.constAngle != null) {
    turret.angle = turret.constAngle;
  } else {
    let vect = target.sub(turret.pos);
    if (vect.x === 0 && vect.y === 0) {
      return;
    }

    turret.angle = Math.atan2(vect.y, vect.x);
  }
}
