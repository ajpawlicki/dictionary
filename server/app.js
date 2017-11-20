const express = require('express');
const app = express();

const fs = require('fs');

app.use(express.static(__dirname + '/../client/'));

const dictionary = fs.readFileSync(__dirname + '/data/dictionary.txt', 'utf8')
  .split('\n')
  .reduce((dic, word) => {
    dic.set(word, true);
    
    return dic;
  }, new Map());

const getWords = (str) => {
  const words = {};

  (function subroutine(leftover, perm = '') {
    if (dictionary.has(perm) && !words.hasOwnProperty(perm)) words[perm] = true;

    for (let i = 0; i < leftover.length; i++) {
      subroutine(leftover.slice(0, i).concat(leftover.slice(i+1)), perm + leftover[i]);
    }
  })(str);

  return Object.keys(words).sort();
};

app.get('/getWords', (req, res) => {
  const validWords = getWords(req.query.txt.toUpperCase());

  res.send(validWords);
});

app.listen(4000, () => console.log('Listening on port 4000!'));