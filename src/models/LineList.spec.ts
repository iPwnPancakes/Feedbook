import { LineList } from './LineList';
import { Line } from './Line';

describe('LineList', () => {
  describe('exists', () => {
    it('should return false when internal list is empty', () => {
      let list = new LineList();

      expect(list.exists('')).toBeFalsy();
    });

    it('should return true when matching identifier is found', () => {
      let list = new LineList();
      list.add(new Line('test', []));

      expect(list.exists('test')).toBeTruthy();
    });
  });
});
