import Tile from 'js/trial/tile'
import Point from 'js/common/point'

const EPSILON = 0.01;

let xToTile = (x) => {
  return Math.floor(x / Tile.WIDTH);
}

let yToTile = (y) => {
  return Math.floor(y / Tile.HEIGHT);
}

let calcNextXBound = (xTile, isPos) => {
  return Tile.WIDTH * (xTile + (isPos ? 1 : 0));
}

let calcNextYBound = (yTile, isPos) => {
  return Tile.HEIGHT * (yTile + (isPos ? 1 : 0));
}

let calcTValue = (start, vec, goal) => {
  let result = ((goal - start) / vec) || Infinity;
  return result >= 0 ? result : Infinity;
}

export default class {
  constructor(character, stage) {
    this.character = character;
    this.stage = stage;
  }

  apply() {
    this.character.isGrounded = false;

    let xPositive = this.character.velo.x >= 0;
    let yPositive = this.character.velo.y >= 0;
    let xDir = xPositive ? 1 : -1;
    let yDir = yPositive ? 1 : -1;

    let epsilonPoint = new Point(xDir, yDir).multM(EPSILON);

    let boundCorner = null;
    let opposite = null;

    let recalcBounds = () => {
      boundCorner = this.character.getBound(xPositive, yPositive).subM(epsilonPoint);
      opposite = this.character.getBound(!xPositive, !yPositive).addM(epsilonPoint);
    };
    recalcBounds();

    let curXTile = xToTile(boundCorner.x);
    let curYTile = yToTile(boundCorner.y);

    let nextXBound = calcNextXBound(curXTile, xPositive);
    let nextYBound = calcNextYBound(curYTile, yPositive);

    while (true) {
      let xt = calcTValue(boundCorner.x, this.character.velo.x, nextXBound);
      let yt = calcTValue(boundCorner.y, this.character.velo.y, nextYBound);

      if (xt > 1 && yt > 1) {
        break;
      } else if (yt < xt) {
        let oppositeX = opposite.x + yt * this.character.velo.x;
        let oppositeXTile = xToTile(oppositeX);

        let didHit = false
          for (let xTile = oppositeXTile; xTile != curXTile + xDir; xTile += xDir) {
            if (this.stage.isWall(xTile, curYTile + yDir)) {
              didHit = true;
              this.character.isGrounded = true;
              this.character.pos.y += nextYBound - boundCorner.y - epsilonPoint.y;
              this.character.velo.y = 0;
              recalcBounds();
              break;
            }
          }

        if (!didHit) {
          curYTile += yDir;
          nextYBound += Tile.HEIGHT * yDir;
        }
      } else {
        let oppositeY = opposite.y + xt * this.character.velo.y;
        let oppositeYTile = yToTile(oppositeY);

        let didHit = false;
        for (let yTile = oppositeYTile; yTile != curYTile + yDir; yTile += yDir) {
          if (this.stage.isWall(curXTile + xDir, yTile)) {
            debugger;
            didHit = true;
            this.character.pos.x += nextXBound - boundCorner.x - epsilonPoint.x;
            this.character.velo.x = 0;
            recalcBounds();
            break;
          }
        }

        if (!didHit) {
          curXTile += xDir;
          nextXBound += Tile.WIDTH * xDir;
        }
      }
    }

    this.character.pos.addM(this.character.velo);
  }
}
