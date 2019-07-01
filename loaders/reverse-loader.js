module.exports = function loader(content) {
  const result = content.split('').reverse().join('');
  return `export default ${result}`;
};
