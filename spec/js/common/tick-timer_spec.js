import TickTimer from 'js/common/tick-timer'

describe('vector', () => {
  describe('constructor', () => {
    it('', () => {
      let newTimer = new TickTimer();

      expect(newTimer.ticks).to.equal(0);
    });
  });

  describe('addTick', () => {
    it('', () => {
      let newTimer = new TickTimer();

      for (let i = 1; i < 100; i++) {
        newTimer.addTick();
        expect(newTimer.ticks).to.equal(i);
      }
    });
  });

  describe('isOnInterval', () => {
    it('simple case', () => {
      let newTimer = new TickTimer();

      newTimer.ticks = 24;

      expect(newTimer.isOnInterval(1)).to.equal(true);
      expect(newTimer.isOnInterval(2)).to.equal(true);
      expect(newTimer.isOnInterval(3)).to.equal(true);
      expect(newTimer.isOnInterval(4)).to.equal(true);
      expect(newTimer.isOnInterval(5)).to.equal(false);
      expect(newTimer.isOnInterval(6)).to.equal(true);
      expect(newTimer.isOnInterval(7)).to.equal(false);
      expect(newTimer.isOnInterval(8)).to.equal(true);
      expect(newTimer.isOnInterval(9)).to.equal(false);
      expect(newTimer.isOnInterval(10)).to.equal(false);
    });

    it('with start', () => {
      let newTimer = new TickTimer();

      newTimer.ticks = 26;

      expect(newTimer.isOnInterval(1, 2)).to.equal(true);
      expect(newTimer.isOnInterval(2, 2)).to.equal(true);
      expect(newTimer.isOnInterval(3, 2)).to.equal(true);
      expect(newTimer.isOnInterval(4, 2)).to.equal(true);
      expect(newTimer.isOnInterval(5, 2)).to.equal(false);
      expect(newTimer.isOnInterval(6, 2)).to.equal(true);
      expect(newTimer.isOnInterval(7, 2)).to.equal(false);
      expect(newTimer.isOnInterval(8, 2)).to.equal(true);
      expect(newTimer.isOnInterval(9, 2)).to.equal(false);
      expect(newTimer.isOnInterval(10, 2)).to.equal(false);
    });

    it('fails with negative', () => {
      let newTimer = new TickTimer();

      newTimer.ticks = 6;

      expect(newTimer.isOnInterval(2)).to.equal(true);
      expect(newTimer.isOnInterval(2, 0)).to.equal(true);
      expect(newTimer.isOnInterval(2, 2)).to.equal(true);
      expect(newTimer.isOnInterval(2, 4)).to.equal(true);
      expect(newTimer.isOnInterval(2, 6)).to.equal(true);
      expect(newTimer.isOnInterval(2, 8)).to.equal(false);
      expect(newTimer.isOnInterval(2, 10)).to.equal(false);
    });
  });
});
