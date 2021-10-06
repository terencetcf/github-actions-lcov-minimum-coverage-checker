# GitHub Action — LCOV Minimum Coverage Checker

A github action that use lcov.info file verify if the test coverage has reached a minimum threshold

## Usage

### Inputs

For more information on these inputs, see the [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions)

- `coverage-file`: File path of the test coverage file. e.g.: `coverage/lcov.info`
- `minimum-coverage`: The minimum test coverage threshold. Optional. Default: `0`

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
