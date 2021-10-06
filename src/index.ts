import * as core from '@actions/core';
import { fileUtil, testCoverageUtil } from '@utils';

async function run(): Promise<void> {
  try {
    const filePath = core.getInput('coverage-file');
    const fullFilePath = `./${filePath}`;
    core.info(`Loading test coverage file (${fullFilePath})...`);
    const content = fileUtil.getFileContent(fullFilePath);

    core.info(`Verify test coverage results...`);
    const totalCoverage = testCoverageUtil.getCoveragePercentage(content);
    const minimumCoverage = parseInt(core.getInput('minimum-coverage'));
    const isFailure = totalCoverage < minimumCoverage;

    if (isFailure) {
      core.setFailed(
        `The current code coverage (${totalCoverage}%) is below the minimum ${minimumCoverage}% threshold.`,
      );
      return;
    }

    core.info(`The current code coverage ${totalCoverage}%`);
  } catch (error: SafeAny) {
    core.setFailed(error);
  }
}

run();
