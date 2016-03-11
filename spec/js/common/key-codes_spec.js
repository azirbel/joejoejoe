import KeyCodes from 'js/common/key-codes'
import { KEY_B } from 'js/common/key-codes'

describe('key codes', () => {
  it('can import as class', () => {
    expect(KeyCodes.KEY_A).to.equal(65);
  });

  it('can import as vars', () => {
    expect(KEY_B).to.equal(66);
  });
});
