#!/bin/sh

cd "$GITHUB_WORKSPACE"

export REVIEWDOG_GITHUB_API_TOKEN="${INPUT_GITHUB_TOKEN}"

if [ ! -f "$(npm bin)/stylelint" ]; then
  npm install
fi

$(npm bin)/stylelint --version

if [ "${INPUT_REPORTER}" == 'github-pr-review' ]; then
  # Use jq and github-pr-review reporter to format result to include link to rule page.
  $(npm bin)/stylelint "${INPUT_STYLELINT_INPUT:-'**/*.css'}" --config="${INPUT_STYLELINT_CONFIG}" -f json \
    | jq -r '.[] | {source: .source, warnings:.warnings[]} | "\(.source):\(.warnings.line):\(.warnings.column):\(.warnings.severity): \(.warnings.text) [\(.warnings.rule)](https://stylelint.io/user-guide/rules/\(.warnings.rule))"' \
    | reviewdog -efm="%f:%l:%c:%t%*[^:]: %m" -name="stylelint" -reporter=github-pr-review -level="${INPUT_LEVEL}"
else
  $(npm bin)/stylelint "${INPUT_STYLELINT_INPUT:-'**/*.css'}" --config="${INPUT_STYLELINT_CONFIG}" \
    | reviewdog -f="stylelint" -reporter="${INPUT_REPORTER:-github-pr-check}" -level="${INPUT_LEVEL}"
fi
