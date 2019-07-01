const t = require('@babel/types');

function genImportDeclaration(specs, opts) {
  return specs.reduce((newspecs, spec) => {
    const imports = [];
    const StringLiteral = t.StringLiteral(`${opts.libraryName}/lib/${spec.local.name}`);
    const ImportDefaultSpecifier = t.ImportDefaultSpecifier(spec.local);
    const ImportDeclaration = t.ImportDeclaration([ImportDefaultSpecifier], StringLiteral);
    imports.push(ImportDeclaration);
    if (opts.style) {
      const cssStringLiteral = t.StringLiteral(`${opts.libraryName}/lib/${spec.local.name.toLowerCase()}.${opts.style}`);
      const cssImportDeclaration = t.ImportDeclaration([], cssStringLiteral);
      imports.push(cssImportDeclaration);
    }
    return newspecs.concat(imports);
  }, []);
}

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path, { opts }) {
        if (!opts.libraryName) opts.libraryName = 'lodash';
        if (!opts.style) opts.style = 'css';
        const { node = {} } = path;
        const { source, specifiers = [] } = node;
        if (!source || !specifiers.length) return;
        if (source.value === opts.libraryName && !t.isImportDefaultSpecifier(specifiers[0])) {
          path.replaceWithMultiple(genImportDeclaration(specifiers, opts));
        }
      },
    },
  };
};
