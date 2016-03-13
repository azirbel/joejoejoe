import Vector from 'js/common/vector';
import { iterateRay } from 'js/trial/services/cast-ray'

describe('cast-ray', () => {
  describe('iterateRay', () => {
    it('cancels after return true', () => {
      let start = new Vector(40.5, 40.5);
      let dir = new Vector(0.4, 0.4);
      let callback = (xt, yt, isX) => {
        return true;
      };
      let spy = sinon.spy(callback);

      iterateRay(start, dir, spy);
      expect(spy.calledOnce).to.equal(true);
    });

    it('simple case go right', () => {
      let iterNum = 0;
      let start = new Vector(48, 40.5);
      let dir = new Vector(12.8, 0);
      let calledCount = 0;
      let callback = (xt, yt, isX) => {
        expect(isX).to.equal(true);
        expect(xt).to.equal(1.25 + calledCount * 2.5);
        calledCount++;
        if (calledCount >= 5) {
          return true;
        }
      };
      iterateRay(start, dir, callback);

      expect(calledCount).to.equal(5);
    });

    it('simple case go down', () => {
      let iterNum = 0;
      let start = new Vector(48, 48);
      let dir = new Vector(0, 12.8);
      let calledCount = 0;
      let callback = (xt, yt, isX) => {
        expect(isX).to.equal(false);
        expect(yt).to.equal(1.25 + calledCount * 2.5);
        calledCount++;
        if (calledCount >= 5) {
          return true;
        }
      };
      iterateRay(start, dir, callback);

      expect(calledCount).to.equal(5);
    });

    it('diagonal', () => {
      let iterNum = 0;
      let start = new Vector(48, 40);
      let dir = new Vector(12.8, 12.8);
      let calledCount = 0;
      let callback = (xt, yt, isX) => {
        expect(isX).to.equal(calledCount % 2 == 0);
        if (isX) {
          expect(xt).to.equal(1.25 + calledCount / 2 * 2.5);
          expect(yt).to.equal(1.25 + 0.625 + calledCount / 2 * 2.5);
        } else {
          expect(yt).to.equal(1.875 + (calledCount - 1) / 2 * 2.5);
          expect(xt).to.equal(1.25 + 2.5 + (calledCount - 1) / 2 * 2.5);
        }
        calledCount++;
        if (calledCount >= 10) {
          return true;
        }
      };
      iterateRay(start, dir, callback);

      expect(calledCount).to.equal(10);
    });
  });
});
