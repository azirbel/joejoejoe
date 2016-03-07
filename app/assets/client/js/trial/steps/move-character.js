import Tile from 'js/trial/tile';
import Vector from 'js/common/vector';

const EPSILON = 0.01;

let xToTile = (x) => {
  return Math.floor(x / Tile.WIDTH);
};

let yToTile = (y) => {
  return Math.floor(y / Tile.HEIGHT);
};

let calcNextXBound = (xTile, isPos) => {
  return Tile.WIDTH * (xTile + (isPos ? 1 : 0));
};

let calcNextYBound = (yTile, isPos) => {
  return Tile.HEIGHT * (yTile + (isPos ? 1 : 0));
};

let calcTValue = (start, vec, goal) => {
  let result = ((goal - start) / vec) || Infinity;
  return result >= 0 ? result : Infinity;
};

export default class MoveCharacter {
  static apply(character, stage) {
    character.isGrounded = false;

    let xPositive = character.velo.x >= 0;
    let yPositive = character.velo.y >= 0;
    let xDir = xPositive ? 1 : -1;
    let yDir = yPositive ? 1 : -1;

    let epsilonPoint = new Vector(xDir, yDir).multM(EPSILON);

    let boundCorner = null;
    let opposite = null;

    let recalcBounds = () => {
      boundCorner = character.getBound(xPositive, yPositive).subM(epsilonPoint);
      opposite = character.getBound(!xPositive, !yPositive).addM(epsilonPoint);
    };
    recalcBounds();

    let curXTile = xToTile(boundCorner.x);
    let curYTile = yToTile(boundCorner.y);

    let nextXBound = calcNextXBound(curXTile, xPositive);
    let nextYBound = calcNextYBound(curYTile, yPositive);

    for (;;) {
      let xt = calcTValue(boundCorner.x, character.velo.x, nextXBound);
      let yt = calcTValue(boundCorner.y, character.velo.y, nextYBound);

      if (xt > 1 && yt > 1) {
        break;
      } else if (yt < xt) {
        let oppositeX = opposite.x + yt * character.velo.x;
        let oppositeXTile = xToTile(oppositeX);

        let didHit = false;
        for (let xTile = oppositeXTile; xTile != curXTile + xDir; xTile += xDir) {
          if (stage.isWall(xTile, curYTile + yDir)) {
            didHit = true;
            if (yPositive) {
              character.isGrounded = true;
            }
            character.pos.y += nextYBound - boundCorner.y - epsilonPoint.y;
            character.velo.y = 0;
            recalcBounds();
            break;
          }
        }

        if (!didHit) {
          curYTile += yDir;
          nextYBound += Tile.HEIGHT * yDir;
        }
      } else {
        let oppositeY = opposite.y + xt * character.velo.y;
        let oppositeYTile = yToTile(oppositeY);

        let didHit = false;
        for (let yTile = oppositeYTile; yTile != curYTile + yDir; yTile += yDir) {
          if (stage.isWall(curXTile + xDir, yTile)) {
            didHit = true;
            character.pos.x += nextXBound - boundCorner.x - epsilonPoint.x;
            character.velo.x = 0;
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

    character.pos.addM(character.velo);
  }

  constructor(character, stage) {
    this.character = character;
    this.stage = stage;
  }

  apply() {
    MoveCharacter.apply(this.character, this.stage);
  }
}
