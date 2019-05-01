// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .
  Using names.txt (right click and 'Save Link/Target As...'), a 46K text file containing over
  five-thousand first names, begin by sorting it into alphabetical order. Then working out the
  alphabetical value for each name, multiply this value by its alphabetical position in the list to
  obtain a name score.

  For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 +
  9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.

  What is the total of all the name scores in the file?

*/

/*
On the face: I'm not sure there's really much to do here except brute force our way through.

Issues: we'll find out.

Ideas: follow the directions. It doesn't seem like there's much to this problem. Which probably
  means I haven't thought about it enough.

  refresher:
  let a = "a";
  a = a.charCodeAt(0); // converts to ascii value

  A-Z corresponds to 65-90; a-z corresponds to 97-122
  our strings are all full caps, so only need 65-90 which makes things simpler.
  take char.charCodeAt - 64 to get A === 1, B === 2, etc.

  data array contains 5163 indexes

  So, make one pass over the array, at each index, convert name to integer-sum, then multiply by
  index position, then add it to sum and move to next index. This way, no need to re-write the Array
  or make multiple passes over it.

*/

//Solution . . .

//read in the data from sourcefile
let fs = require('fs');

let data;

//read .txt file
try {
    data = fs.readFileSync('p022_names.txt', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}

//parse it to desired format
data = data.split('","');

//trim off the leading and trailing quote marks of the file
data[0] = data[0].substring(1);
data[data.length-1] = data[data.length-1].substring(0, data[data.length-1].length - 1);

//Make array alphabetical
data = data.sort();

//Score the list

let nameScore = 0;

//iterates over the array, multiplying string value by index+1 and adding to nameScore
for (let i = 0; i < data.length; i++) {
    let multiplier = i+1;
    let integerSum = stringToIntegerSum(data[i]);
    let product = multiplier * integerSum;
    nameScore += product;
}

//computes sum of alphabetic values of characters in a string
function stringToIntegerSum (string) {
    let integerSum = 0;
    for (let i = 0; i < string.length; i++) {
        integerSum += string.charCodeAt(i) - 64;
    }
    return integerSum;
}

console.log(nameScore);
