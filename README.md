# GitHub Action: Run stylelint with reviewdog

[![Docker Image CI](https://github.com/reviewdog/action-stylelint/workflows/Docker%20Image%20CI/badge.svg)](https://github.com/reviewdog/action-stylelint/actions)
[![Release](https://img.shields.io/github/release/reviewdog/action-stylelint.svg?maxAge=43200)](https://github.com/reviewdog/action-stylelint/releases)

This action runs [stylelint](https://github.com/stylelint/stylelint) with
[reviewdog](https://github.com/reviewdog/reviewdog) on pull requests to improve
code review experience.

## Inputs

### `github_token`

**Required**. Must be in form of `github_token: ${{ secrets.github_token }}`'.

### `level`

Optional. Report level for reviewdog [info,warning,error].
It's same as `-level` flag of reviewdog.

### `stylelint_input`

Optional. Files or glob. Default: `**/*.css`.
It's same as `[input]` of stylelint.

### `stylelint_config`

Optional. It's same as `--config` flag of stylelint.
You can use `stylelint-config-recommended`/`stylelint-config-standard` as a shared configuration
if your project doens't have stylelintrc.

## Example usage

### [.github/workflows/reviewdog.yml](.github/workflows/reviewdog.yml)

```yml
name: reviewdog
on: [pull_request]
jobs:
  stylelint:
    name: runner / stylelint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: stylelint
        uses: reviewdog/action-stylelint@v1
        with:
          github_token: ${{ secrets.github_token }}
          stylelint_input: '**/*.css'
          stylelint_config: 'stylelint-config-recommended'
```
