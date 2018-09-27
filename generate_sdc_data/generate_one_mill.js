const fs = require('fs');
const path = require('path');
const generateCompanyEntry = require('./generateCompanyEntry.js');

// Return all unique stock acrynoms for n letters long //
const range = (startChar, endChar) => {
  const result = [];
  const start = startChar.charCodeAt(0);
  const end = endChar.charCodeAt(0);
  for (let i = start; i <= end; i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
};

const alphabet = range('A', 'Z');

const generateTickerSymbol = (n = 5, baseChar = '') => {
  // let counter = 1;
  const result = [];
  const uniqueTicker = (current = '') => {
    if (current.length === n) {
      return result.push(current);
    }
    alphabet.forEach(char => uniqueTicker(current + char));
  };
  uniqueTicker(baseChar);
  return result;
};

///////////////////////////

const writeFiles = (acronymLength) => {
  // console.time(label);
  let totalEntries = [1];
  let fileIndex = [1];
  alphabet.forEach((letter) => {
    const acronyms = generateTickerSymbol(acronymLength, letter);
    generateCompanyEntry(acronyms, totalEntries, fileIndex);
    // fs.writeFile(
    //   path.join(__dirname, 'ten_mill_data', `data_${fileIndex}.json`),
    //   JSON.stringify(generateCompanyEntry(acronyms, totalEntries)),
    //   (err) => {
    //     if (err) return console.log(err);
    //   }
    // );
  });
};

writeFiles(5);

// fs.writeFile(
//   path.join(__dirname, 'data_1.json'),
//   JSON.stringify('['),
//   (err) => {
//     if (err) return console.log(err);
//   }
// );

// fs.appendFile(
//   path.join(__dirname, 'data_1.json'),
//   JSON.stringify({
//     test1: 'blah'
//   }),
//   (err) => {
//     if (err) return console.log(err);
//   }
// );

// fs.appendFile(
//   path.join(__dirname, 'data_1.json'),
//   JSON.stringify(','),
//   (err) => {
//     if (err) return console.log(err);
//   }
// );

// fs.appendFile(
//   path.join(__dirname, 'data_1.json'),
//   JSON.stringify({
//     test: 'text'
//   }),
//   (err) => {
//     if (err) return console.log(err);
//   }
// );

// fs.appendFile(
//   path.join(__dirname, 'data_1.json'),
//   JSON.stringify(']'),
//   (err) => {
//     if (err) return console.log(err);
//   }
// );


module.exports = writeFiles;
