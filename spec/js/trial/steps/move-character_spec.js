import MoveCharater from 'js/trial/steps/move-character';

import Character from 'js/trial/character';
import StageParser from 'js/trial/parse/stage-parser';
import Vector from 'js/common/vector';

describe('MoveCharacter', () => {
  let rawStage = 
        'x                  x\n' +
        'x                  x\n' +
        'x                  x\n' +
        'x                  x\n' +
        'x                  x\n' +
        'x                  x\n' +
        'x                  x\n' +
        'x                  x\n' +
        'x        s         x\n' +
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

  // Assume character is 20x20, point is bottom middle
  let character = new Character(new Vector(0, 0));
  character.getBounds = () => {
    return [-10, 10, 0, 20];
  }

  it('move in air - no special adjustment', () => {
    character.respawn(new Vector(100, 100));
    character.velo = new Vector(1, -1);

    MoveCharater.apply(character, stage);

    expect(character.pos.x).to.equal(101);
    expect(character.pos.y).to.equal(99);
  });

  it('hit ground from air', () => {
    character.respawn(new Vector(100, 550));
    character.velo = new Vector(0, 50);

    MoveCharater.apply(character, stage);

    expect(character.pos.x).to.equal(100);
    expect(character.pos.y).to.equal(588);
  });
});
