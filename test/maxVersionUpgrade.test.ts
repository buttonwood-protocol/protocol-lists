import { VersionUpgrade } from '@uniswap/token-lists';
import { expect } from 'chai';
import { maxVersionUpgrade } from '../src/maxVersionUpgrade';

const humanFriendlyNames = {
  [VersionUpgrade.NONE]: 'none',
  [VersionUpgrade.PATCH]: 'patch',
  [VersionUpgrade.MINOR]: 'minor',
  [VersionUpgrade.MAJOR]: 'major',
};

const testCases = [
  {
    params: [VersionUpgrade.NONE, VersionUpgrade.NONE],
    expectedResult: VersionUpgrade.NONE,
  },
  {
    params: [VersionUpgrade.NONE, VersionUpgrade.PATCH],
    expectedResult: VersionUpgrade.PATCH,
  },
  {
    params: [VersionUpgrade.NONE, VersionUpgrade.MINOR],
    expectedResult: VersionUpgrade.MINOR,
  },
  {
    params: [VersionUpgrade.NONE, VersionUpgrade.MAJOR],
    expectedResult: VersionUpgrade.MAJOR,
  },
  {
    params: [VersionUpgrade.PATCH, VersionUpgrade.NONE],
    expectedResult: VersionUpgrade.PATCH,
  },
  {
    params: [VersionUpgrade.PATCH, VersionUpgrade.PATCH],
    expectedResult: VersionUpgrade.PATCH,
  },
  {
    params: [VersionUpgrade.PATCH, VersionUpgrade.MINOR],
    expectedResult: VersionUpgrade.MINOR,
  },
  {
    params: [VersionUpgrade.PATCH, VersionUpgrade.MAJOR],
    expectedResult: VersionUpgrade.MAJOR,
  },
  {
    params: [VersionUpgrade.MINOR, VersionUpgrade.NONE],
    expectedResult: VersionUpgrade.MINOR,
  },
  {
    params: [VersionUpgrade.MINOR, VersionUpgrade.PATCH],
    expectedResult: VersionUpgrade.MINOR,
  },
  {
    params: [VersionUpgrade.MINOR, VersionUpgrade.MINOR],
    expectedResult: VersionUpgrade.MINOR,
  },
  {
    params: [VersionUpgrade.MINOR, VersionUpgrade.MAJOR],
    expectedResult: VersionUpgrade.MAJOR,
  },
  {
    params: [VersionUpgrade.MAJOR, VersionUpgrade.NONE],
    expectedResult: VersionUpgrade.MAJOR,
  },
  {
    params: [VersionUpgrade.MAJOR, VersionUpgrade.PATCH],
    expectedResult: VersionUpgrade.MAJOR,
  },
  {
    params: [VersionUpgrade.MAJOR, VersionUpgrade.MINOR],
    expectedResult: VersionUpgrade.MAJOR,
  },
  {
    params: [VersionUpgrade.MAJOR, VersionUpgrade.MAJOR],
    expectedResult: VersionUpgrade.MAJOR,
  },
];

describe('maxVersionUpgrade', () => {
  for (const { params, expectedResult } of testCases) {
    const name = params.map((param) => humanFriendlyNames[param]).join(' & ');
    it(name, () => {
      expect(maxVersionUpgrade(params[0], params[1])).to.deep.equal(
        expectedResult,
      );
    });
  }

  // it('upgrade-none', async () => {
  //   expect(
  //     maxVersionUpgrade(VersionUpgrade.NONE, VersionUpgrade.NONE),
  //   ).to.deep.equal(VersionUpgrade.NONE);
  // });
});
