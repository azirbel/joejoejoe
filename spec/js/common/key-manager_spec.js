import KeyManager from 'js/common/key-manager'

describe('key manager', () => {
  it('can accept keypress', () => {
    let keyManager = new KeyManager();

    keyManager.pressKey(1);

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(true);
  });

  it('returns false for keys which are not pressed', () => {
    let keyManager = new KeyManager();

    keyManager.pressKey(1);

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(true);

    expect(keyManager.isDown(2)).to.equal(false);
    expect(keyManager.isPressed(2)).to.equal(false);
  });

  it('new frame clears pressed state', () => {
    let keyManager = new KeyManager();

    keyManager.pressKey(1);

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(true);

    keyManager.newFrame();

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(false);
  });

  it('key down events from being held do not trigger a press', () => {
    let keyManager = new KeyManager();

    keyManager.pressKey(1);

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(true);

    keyManager.newFrame();

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(false);

    keyManager.pressKey(1);

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(false);
  });

  it('keys may be released', () => {
    let keyManager = new KeyManager();

    keyManager.pressKey(1);

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(true);

    keyManager.releaseKey(1);

    expect(keyManager.isDown(1)).to.equal(false);
    expect(keyManager.isPressed(1)).to.equal(true);
  });

  it('clearState clears all state', () => {
    let keyManager = new KeyManager();

    keyManager.pressKey(1);

    expect(keyManager.isDown(1)).to.equal(true);
    expect(keyManager.isPressed(1)).to.equal(true);

    keyManager.clearState();

    expect(keyManager.isDown(1)).to.equal(false);
    expect(keyManager.isPressed(1)).to.equal(false);
  });
});
