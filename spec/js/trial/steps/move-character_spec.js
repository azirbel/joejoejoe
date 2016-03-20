import MoveCharacter from 'js/trial/steps/move-character';

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
  let states = ['STAND', 'CROUCH', 'ROLL'];

  let character = new Character(new Vector(0, 0));

  it('move in air - no special adjustment', () => {
    character.respawn(new Vector(100, 100));
    character.velo = new Vector(1, -1);

    MoveCharacter.apply(character, stage);

    expect(character.pos.x).to.equal(101);
    expect(character.pos.y).to.equal(99);
  });

  it('hit ground from air', () => {
    character.respawn(new Vector(100, 550));
    character.velo = new Vector(0, 100);

    MoveCharacter.apply(character, stage);

    expect(character.pos.x).to.equal(100);
    expect(character.pos.y).to.equal(608);
  });
});
