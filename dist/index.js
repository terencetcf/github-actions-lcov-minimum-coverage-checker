"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const core_1 = __importDefault(require("@actions/core"));
const github_1 = __importDefault(require("@actions/github"));
const parse_lcov_1 = __importDefault(require("parse-lcov"));
async function run() {
    try {
        const tmpPath = path_1.default.resolve(os_1.default.tmpdir(), github_1.default.context.action);
        const coverageFilesPattern = core_1.default.getInput('coverage-file');
        const coverageFilePath = tmpPath + coverageFilesPattern;
        const coverageFileContent = fs_1.default.readFileSync(coverageFilePath, {
            encoding: 'utf-8',
        });
        const lcovRecords = (0, parse_lcov_1.default)(coverageFileContent);
        const totalLinesHit = lcovRecords.reduce((acc, rec) => acc + rec.lines.hit, 0);
        const totalLinesFound = lcovRecords.reduce((acc, rec) => acc + rec.lines.found, 0);
        const totalCoverage = Math.round((totalLinesHit / totalLinesFound) * 100);
        const minimumCoverage = parseInt(core_1.default.getInput('minimum-coverage'));
        const isFailure = totalCoverage < minimumCoverage;
        if (isFailure) {
            core_1.default.setFailed(`The current code coverage (${totalCoverage}%) is below the ${minimumCoverage}%.`);
            return;
        }
        core_1.default.info(`The current code coverage ${totalCoverage}%`);
    }
    catch (error) {
        core_1.default.setFailed(error.message);
    }
}
run();
