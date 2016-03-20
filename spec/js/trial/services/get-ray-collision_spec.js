import Vector from 'js/common/vector';
import StageParser from 'js/trial/parse/stage-parser';
import { getRayCollision } from 'js/trial/services/cast-ray'

describe('get-ray-collision', () => {
  let rawStage = 
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x        S         x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'xxxxxxxxxxxxxxxxxxxx';
  let stage = StageParser.parse(rawStage);

  it('simple case go right', () => {
    let start = new Vector(48, 40.5);
    let dir = new Vector(1.0, 0);

    let result = getRayCollision(start, dir, stage);
    expect(result.x).to.equal(608);
    expect(result.y).to.equal(40.5);
  });

  it('simple case go down', () => {
    let start = new Vector(48, 48);
    let dir = new Vector(0, 12.8);

    let result = getRayCollision(start, dir, stage);
    expect(result.x).to.equal(48);
    expect(result.y).to.equal(608);
  });

  it('diagonal', () => {
    let start = new Vector(48, 40);
    let dir = new Vector(12.8, 12.8);

    let result = getRayCollision(start, dir, stage);
    expect(result.x).to.equal(608);
    expect(result.y).to.equal(600);
  });
});
