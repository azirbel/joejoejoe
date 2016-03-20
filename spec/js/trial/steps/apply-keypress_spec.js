import ApplyKeypress from 'js/trial/steps/apply-keypress';
import MoveCharacter from 'js/trial/steps/move-character';
import KeyManager from 'js/common/key-manager';

import Character from 'js/trial/character';
import StageParser from 'js/trial/parse/stage-parser';
import Vector from 'js/common/vector';

import { KEY_W, KEY_A, KEY_S, KEY_D } from 'js/common/key-codes';
const UP = KEY_W;
const LEFT = KEY_A;
const DOWN = KEY_S;
const RIGHT = KEY_D;

describe('ApplyKeypress', () => {
  let rawStage = 
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
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'x                  x\n' +
    'xx                 x\n' +
    'x        S         x\n' +
    'xxxxxxxxxxxxxxxxxxxx';
  let stage = StageParser.parse(rawStage);
  let keys = new KeyManager();

  let states = ['STAND', 'CROUCH', 'ROLL', 'RUN'];
  let character = new Character(new Vector(0, 0));

  beforeEach(() => {
    keys = new KeyManager();
  });

  it('crouches on down', () => {
    character.respawn(new Vector(100, 608));
    character.velo = new Vector(0, 0);

    keys.pressKey(DOWN);

    ApplyKeypress.apply(character, keys, stage);

    expect(character.state).to.equal('CROUCH');
    expect(character.isCrouch).to.equal(true);
  });

  it('rolls on down and side', () => {
    character.respawn(new Vector(100, 608));
    character.velo = new Vector(0, 0);

    keys.pressKey(LEFT);
    keys.pressKey(DOWN);

    ApplyKeypress.apply(character, keys, stage);

    expect(character.state).to.equal('ROLL');
    expect(character.isCrouch).to.equal(true);
    expect(character.isRoll).to.equal(true);
    expect(character.isRight).to.equal(false);
  });

  it('can uncrouch', () => {
    character.respawn(new Vector(100, 608));
    character.velo = new Vector(0, 0);

    character.isCrouch = true;

    expect(character.state).to.equal('CROUCH');
    expect(character.isCrouch).to.equal(true);

    ApplyKeypress.apply(character, keys, stage);

    expect(character.state).to.equal('STAND');
    expect(character.isCrouch).to.equal(false);
  });

  it('cannot uncrouch under obstacles', () => {
    character.respawn(new Vector(33, 608));
    character.velo = new Vector(0, 0);

    character.isCrouch = true;

    expect(character.state).to.equal('CROUCH');
    expect(character.isCrouch).to.equal(true);

    ApplyKeypress.apply(character, keys, stage);

    expect(character.state).to.equal('CROUCH');
    expect(character.isCrouch).to.equal(true);
  });
});
