import * as core from '@actions/core';
import fs from 'fs';
import parseLCOV from 'parse-lcov';

async function run(): Promise<void> {
    try {
        const coverageFilesPattern = core.getInput('coverage-file');
        const coverageFilePath = `./${coverageFilesPattern}`;
        core.info(`Reading coverage file (${coverageFilePath}) content...`);
        const coverageFileContent = fs.readFileSync(coverageFilePath, {
            encoding: 'utf-8',
        });
        core.info(`Parsing lcov results...`);
        const lcovRecords = parseLCOV(coverageFileContent);
        const totalLinesHit = lcovRecords.reduce<number>(
            (acc, rec) => acc + rec.lines.hit,
            0,
        );
        const totalLinesFound = lcovRecords.reduce<number>(
            (acc, rec) => acc + rec.lines.found,
            0,
        );
        const totalCoverage = Math.round(
            (totalLinesHit / totalLinesFound) * 100,
        );
        const minimumCoverage = parseInt(core.getInput('minimum-coverage'));
        const isFailure = totalCoverage < minimumCoverage;
        if (isFailure) {
            core.setFailed(
                `The current code coverage (${totalCoverage}%) is below the minimum ${minimumCoverage}% threshold.`,
            );
            return;
        }
        core.info(`The current code coverage ${totalCoverage}%`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        core.setFailed(error);
    }
}

run();
