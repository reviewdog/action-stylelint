# GitHub Action: Run stylelint with reviewdog

[![Docker Image CI](https://github.com/reviewdog/action-stylelint/workflows/Docker%20Image%20CI/badge.svg)](https://github.com/reviewdog/action-stylelint/actions)
[![depup](https://github.com/reviewdog/action-stylelint/workflows/depup/badge.svg)](https://github.com/reviewdog/action-stylelint/actions?query=workflow%3Adepup)
[![release](https://github.com/reviewdog/action-stylelint/workflows/release/badge.svg)](https://github.com/reviewdog/action-stylelint/actions?query=workflow%3Arelease)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/reviewdog/action-stylelint?logo=github&sort=semver)](https://github.com/reviewdog/action-stylelint/releases)
[![action-bumpr supported](https://img.shields.io/badge/bumpr-supported-ff69b4?logo=github&link=https://github.com/haya14busa/action-bumpr)](https://github.com/haya14busa/action-bumpr)

This action runs [stylelint](https://github.com/stylelint/stylelint) with
[reviewdog](https://github.com/reviewdog/reviewdog) on pull requests to improve
code review experience.

[![github-pr-check sample](https://user-images.githubusercontent.com/3797062/65406379-54848e00-de1a-11e9-8464-1037e1cacf80.png)](https://github.com/reviewdog/action-stylelint/pull/1)
[![github-pr-review sample](https://user-images.githubusercontent.com/3797062/65406408-6d8d3f00-de1a-11e9-90dd-d39aa3e19e7f.png)](https://github.com/reviewdog/action-stylelint/pull/1)

## Inputs

### `fail_on_error`

Whether reviewdog should fail when errors are found. [true,false]
This is useful for failing CI builds in addition to adding comments when errors are found.
It's the same as the `-fail-on-error` flag of reviewdog.

### `filter_mode`

Optional. Reviewdog filter mode [added, diff_context, file, nofilter]
It's the same as the `-filter-mode` flag of reviewdog.

### `github_token`

**Required**. Default is `${{ github.token }}`.

### `level`

Optional. Report level for reviewdog [info,warning,error].
It's same as `-level` flag of reviewdog.

### `packages`
Optional. Additional NPM packages to be installed, e.g.:
```
packages: 'stylelint-config-sass-guidelines stylelint-order'
```

### `reporter`

Reporter of reviewdog command [github-pr-check,github-pr-review,github-check].
Default is github-pr-check.
github-pr-review can use Markdown and add a link to rule page in reviewdog reports.

### `stylelint_input`

Optional. Files or glob. Default: `**/*.css`.
It's same as `[input]` of stylelint.

### `stylelint_config`

Optional. It's same as `--config` flag of stylelint.

### `workdir`

Optional. The directory from which to look for and run stylelint. Default '.'

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
      - uses: actions/checkout@v3
      - name: stylelint
        uses: reviewdog/action-stylelint@v1
        with:
          reporter: github-pr-review # Change reporter.
          stylelint_input: '**/*.css'
```
