# GitHub Action — LCOV Minimum Coverage Checker

github action that use lcov.info file verify if the test coverage has reached a minimum threshold

## Usage

### Inputs

For more information on these inputs, see the [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith)

- `coverage-files`: The coverage files to scan. For example, `coverage/lcov.*.info`
- `minimum-coverage`: The minimum coverage to pass the check. Optional. Default: `0` (always passes)

### Common workflow

```yaml
on: pull_request

name: Continuous Integration

jobs:
  unit_test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Check test coverage
        uses: terencetcf/github-actions-lcov-minimum-coverage-checker@v1
        with:
          coverage-file: coverage/lcov.info
          minimum-coverage: 90
```
