import {pathExists} from './pathExists';
import {expect} from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('path exists', () => {
  it('should return true', async () => {
    const result = await pathExists(__dirname);
    expect(result).to.equal(true);
  });
  it('should return false', async () => {
    const result = await pathExists('/noDirHere');
    expect(result).to.equal(false);
  });
});
