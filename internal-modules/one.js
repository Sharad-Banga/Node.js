//path module

const { log } = require('console');
const path = require('path');

// console.log(path);

// console.log(__dirname);
// console.log(__filename);

const paa = path.join(__dirname,'one.js');
// console.log(paa);

console.log(path.parse(paa));
