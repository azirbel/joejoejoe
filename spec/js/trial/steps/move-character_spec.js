import MoveCharater from 'js/trial/steps/move-character';

import StageParser from 'js/trial/parse/stage-parser';
import Vector from 'js/common/vector';
import Character from 'js/trial/character';

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

  it('move up in air - no special adjustment', () => {
  });
});
