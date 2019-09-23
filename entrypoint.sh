#!/bin/sh

cd "$GITHUB_WORKSPACE"

export REVIEWDOG_GITHUB_API_TOKEN="${INPUT_GITHUB_TOKEN}"

if [ ! -f "$(npm bin)/stylelint" ]; then
  npm install
fi

# Use jq to format result to include link to rule page.
$(npm bin)/stylelint "${INPUT_STYLELINT_INPUT:-'**/*.css'}" --config="${INPUT_STYLELINT_CONFIG}" -f json \
  | jq -r '{source: .[].source, warnings:.[].warnings[]} | "\(.source):\(.warnings.line):\(.warnings.column):\(.warnings.severity): \(.warnings.text) [\(.warnings.rule)](https://github.com/stylelint/stylelint/blob/master/lib/rules/\(.warnings.rule)/README.md)"' \
  | reviewdog -efm="%f:%l:%c:%t%*[^:]: %m" -name="stylelint" -reporter=github-pr-check -level="${INPUT_LEVEL}"
