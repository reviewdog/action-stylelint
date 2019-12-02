# GitHub Action: Run stylelint with reviewdog

[![Docker Image CI](https://github.com/reviewdog/action-stylelint/workflows/Docker%20Image%20CI/badge.svg)](https://github.com/reviewdog/action-stylelint/actions)
[![Release](https://img.shields.io/github/release/reviewdog/action-stylelint.svg?maxAge=43200)](https://github.com/reviewdog/action-stylelint/releases)

This action runs [stylelint](https://github.com/stylelint/stylelint) with
[reviewdog](https://github.com/reviewdog/reviewdog) on pull requests to improve
code review experience.

[![github-pr-check sample](https://user-images.githubusercontent.com/3797062/65406379-54848e00-de1a-11e9-8464-1037e1cacf80.png)](https://github.com/reviewdog/action-stylelint/pull/1)
[![github-pr-review sample](https://user-images.githubusercontent.com/3797062/65406408-6d8d3f00-de1a-11e9-90dd-d39aa3e19e7f.png)](https://github.com/reviewdog/action-stylelint/pull/1)

## Inputs

### `github_token`

**Required**. Must be in form of `github_token: ${{ secrets.github_token }}`'.

### `level`

Optional. Report level for reviewdog [info,warning,error].
It's same as `-level` flag of reviewdog.

### `reporter`

Reporter of reviewdog command [github-pr-check,github-pr-review,github-check].
Default is github-pr-check.
github-pr-review can use Markdown and add a link to rule page in reviewdog reports.

### `stylelint_input`

Optional. Files or glob. Default: `**/*.css`.
It's same as `[input]` of stylelint.

### `stylelint_config`

Optional. It's same as `--config` flag of stylelint.

## Example usage

You also need to install [stylelint](https://github.com/stylelint/stylelint).

```shell
# Example
$ npm install stylelint stylelint-config-recommended -D
```

You can create [stylelint
config](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)
and this action uses that config too.

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
          reporter: github-pr-review # Change reporter.
          stylelint_input: '**/*.css'
```
