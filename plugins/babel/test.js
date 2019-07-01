const babel = require('@babel/core');

const code = 'import { Button,Picker } from \'ssy-mobile\'';
const res = babel.transform(code, {
  plugins: [
    ['./babel-plugin-ssyImport', {
      libraryName: 'ssy-mobile',
      style: 'css',
    },
    ],
  ],
});

console.log(res.code);
