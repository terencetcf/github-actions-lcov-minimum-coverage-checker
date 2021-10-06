import parseLCOV from 'parse-lcov';

export const testCoverageUtil = {
  getCoveragePercentage: (lcovContent: string): number => {
    const records = parseLCOV(lcovContent);
    const totalLinesHit = records.reduce<number>(
      (acc, rec) => acc + rec.lines.hit,
      0,
    );
    const totalLinesFound = records.reduce<number>(
      (acc, rec) => acc + rec.lines.found,
      0,
    );

    return Math.round((totalLinesHit / totalLinesFound) * 100);
  },
};
