import fs from 'fs';

export const fileUtil = {
  getFileContent: (filePath: string): string => {
    return fs.readFileSync(filePath, {
      encoding: 'utf-8',
    });
  },
};
