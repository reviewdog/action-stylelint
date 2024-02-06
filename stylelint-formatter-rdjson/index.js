// Stylelint Formatter to Output Reviewdog Diagnostic Format (RDFormat)
// https://github.com/reviewdog/reviewdog/tree/7ab09a1158ed4abd0eb0395ab0f1af6cfcdf513e/proto/rdf#rdjson
// https://stylelint.io/developer-guide/formatters

/**
 * @param {import('stylelint').Warning} message
 * @returns string
 * @see https://github.com/stylelint/stylelint/blob/224b280135c6188a061061d0f9ee1042f5cd345a/lib/formatters/stringFormatter.cjs#L173-L188
 */
function formatMessageText(warning) {
  let result =  warning.text;

  // Remove all control characters (newline, tab and etc)
  result = result
    .replace(/[\u0001-\u001A]+/g, ' ')
    .replace(/\.$/, '');

  const ruleString = ` (${warning.rule})`;

  if (result.endsWith(ruleString)) {
    result = result.slice(0, result.lastIndexOf(ruleString));
  }

  return result;
}

/**
 * @type {import('stylelint').Formatter}
 */
module.exports = function (results, returnValue) {
  const rdjson = {
    source: {
      name: 'stylelint',
      url: 'https://stylelint.io/'
    },
    diagnostics: []
  };

  results.filter(r => !r.ignored).forEach(result => {
    const filePath = result.source;

    result.warnings.forEach(warning => {
      const diagnostic = {
        message: formatMessageText(warning),
        location: {
          path: filePath,
          range: {
            start: {
              line: warning.line,
              column: warning.column
            },
            end: warning.endLine && warning.endColumn ? {
              line: warning.endLine,
              column: warning.endColumn
            } : undefined
          }
        },
        severity: warning.severity.toUpperCase(),
        code: {
          value: warning.rule,
          url: returnValue.ruleMetadata?.[warning.rule]?.url
        }
      };

      rdjson.diagnostics.push(diagnostic);
    });
  });

  return JSON.stringify(rdjson);
};
