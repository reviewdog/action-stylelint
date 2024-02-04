// Stylelint Formatter to Output Reviewdog Diagnostic Format (RDFormat)
// https://github.com/reviewdog/reviewdog/tree/7ab09a1158ed4abd0eb0395ab0f1af6cfcdf513e/proto/rdf#rdjson
// https://stylelint.io/developer-guide/formatters

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
        message: warning.text,
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
