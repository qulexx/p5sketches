var txt;
function preload() {
  txt = loadStrings('/assets/shakespeare.txt');
}
var order = 2;
var ngrams = {};
var button;

function setup() {
  noCanvas();
  txt = txt.join(' ');
  var words = txt.split(/\s+/); // Split into an array of words
  
  for (var i = 0; i <= words.length - order; i++) {
    var gram = words.slice(i, i + order).join(' '); // Use join() to create n-grams of whole words

    if (!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(words[i + order]);
  }
  button = createButton("generate");
  button.mousePressed(markovIt);
}

function markovIt() {
    var words = txt.split(/\s+/);
    var startingIndex = floor(random(words.length - order)); // Choose a random starting index
    var currentGram = words.slice(startingIndex, startingIndex + order).join(' ');
    var result = currentGram;
  
    // Continue generating words as before
    for (var i = 0; i < 100; i++) {
      var possibilities = ngrams[currentGram];
      if (!possibilities) {
        break;
      }
      var next = random(possibilities);
      result += ' ' + next;
      words = result.split(/\s+/);
      var len = words.length;
      currentGram = words.slice(len - order, len).join(' ');
    }
  
    createP(result);
}
  
