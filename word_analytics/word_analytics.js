var poem = "In the midway of this our mortal life, \
I found me in a gloomy wood, astray \
Gone from the path direct: and e'en to tell \
It were no easy task, how savage wild \
That forest, how robust and rough its growth, \
Which to remember only, my dismay \
Renews, in bitterness not far from death. \
Yet to discourse of what there good befell, \
All else will I relate discover'd there. \
How first I enter'd it I scarce can say, \
Such sleepy dullness in that instant weigh'd \
My senses down, when the true path I left, \
But when a mountain's foot I reach'd, where clos'd \
The valley, that had pierc'd my heart with dread, \
I l`ook'd aloft, and saw his shoulders broad \
Already vested with that planet's beam, \
Who leads all wanderers safe through every way."

var poemWords = poem.replace(/\,\:\./, '').split(' ');
var totalCount = poemWords.length;
var mostCommonWord;

wordTracker = {};

countWord = function(word) {
  wordTracker[word] = getWordCount(word) + 1;
}

getWordCount = function(word) {
  return wordTracker[word] || 0
}

findMostCommonWord = function() {
  var record = 0;
  var recordWord = '';

  for (var word in wordTracker) {
    if (record < wordTracker[word]) {
      record = wordTracker[word];
      recordWord = word;
    }
  }

  return "The record holder is " + recordWord + " with " + record + " appearances.";
}

countAllWords = function() {
  poemWords.forEach(countWord);
}

countAllWords();
console.log(findMostCommonWord());

console.table(wordTracker);
console.log(totalCount);
