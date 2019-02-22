// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .

  If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are
  3 + 3 + 5 + 4 + 4 = 19 letters used in total.

  If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many
  letters would be used?

  **Note**: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains
  23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing
  out numbers is in compliance with British usage.

*/

/*
On the face: Need to write logic for constructing the written names of numbers. Doi. Seems like,
  effectively, another layer of abstraction like the ASCII encodings for 0-9. Just more complex in
  that more grammar is involved.

Issues: I wish we didn't have to use the British convention with 'and'. The number of times I was
  swiftly and sternly corrected on that point as a child makes it feel like it goes againt the very
  fiber of my being. But, thats more of a personal thing.

Ideas: So, encoding 0 through 9 is pretty easy. We don't need to encode zero because I just re-read
  the problem statement. Good place to start, right? What are our required unique number names?

  "one" "two" "three" . . . "nineteen"
  twenty" "thirty" . . . "ninety"
  "hundred"
  "thousand"
  "and"

  We could define all the keywords into a switch case, and write a function that breaks down numbers
  into their number places (i.e. 391 ==> 300 ==> 3 * 100, 90, 1). Then, run these through the
  switch case to get their word encodings (i.e. 300 ==> three + hundred, 90 ==> ninety, 1 ==> one)
  and then concatenate the strings. "and" is only ever going to come after "hundred", but we can't
  just encode hundred as "hundred and" because of our 100, 200, etc. So maybe instead, check if
  there are words after "hundred" if yes, insert "and".

  Since we don't count spaces, hyphens etc. there's no reason I can see to even add them. Just
  concatenate the strings without formatting like "threehundredandthirtytwo"

  Also, probably switch statement is wrong why to select keyword. Why not just store array of
  keywords and access by matching index position to number value?

  You know. Brute forcing this is going to require writing way more if blocks than I want to bother
  figuring out the logic for and testing and keeping track of. I mean. We need one for 1-20, 21-99,
  100-1000 at minimum and the 21-99 and 100-1000 are going to have to reuse the logic from the
  previous segments too, to boot. But, we can probably just work out a pattern by hand and then just
  write a function that applies that pattern over a given range and this would probably be easier.

  So, what? 1-9 are unique, as are 10-19 because language. but 20-99 has an emergent pattern of . . .
  the tens place values + (8 * the 1 to 9 values). And each hundred is just the hundreds value plus
  another sum of 1-99, which we should already have on hand.

  So we have to brute force 1-9 and 10-19. But then we should be able to apply a pattern to find
  20-99. Sum the results so far and add that to every additional hundred.
*/

//Solution . . .

//zero placeholder to match up index position to keyword value
let keywords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
                "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
                "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
                "eighty", "ninety", "hundred", "thousand", "and"];
let singles = 0;
let teens = 0;
let tensTemp = 0;
let twentyUp = 0;
let firstNinetyNine = 0;
let nextNineHundred = 0;
let sum = 0;

//get the super simple ones. 1-19.
for (let i = 0 ; i < 100 ; i++) {
    if (i < 9) {
        singles += keywords[i].length;
    }
    if (i >= 9 && i < 19) {
        teens += keywords[i].length;
    }

}
//Get 20-99, range of 8 tens places to cover.
for (let j = 0; j < 8 ; j++) {
    tensTemp = 0;
    tensTemp = (keywords[j+19].length * 10) + singles;
    twentyUp +=tensTemp;
}

//sum for 1-99
firstNinetyNine = singles + teens + twentyUp;

//So now we need to get lengths of each hundred, plus firstNinetyNine for each, plus the ands.
//'hundred and' will occur 99 time for each hundreds place(9*99*10). 'hundred' 1 time for each(9*7)
//plus 1-9 value for the hundred count 100 times each. plus 1-99 for each hundreds place.
//100-999
nextNineHundred += 9 * firstNinetyNine;
nextNineHundred += 9 * keywords[27].length;
nextNineHundred += 9 * 99 * (keywords[27].length+keywords[29].length);
nextNineHundred += 100 * singles;

//add the bits up, plus the 1000 parts
sum = firstNinetyNine + nextNineHundred + keywords[28].length + keywords[0].length;
console.log(sum);
