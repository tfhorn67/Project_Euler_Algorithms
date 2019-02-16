// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .
2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the number 2^1000?
*/

/*
On the face: This should be more challenging in low level languages or older high level languages
  like C because of the lack of baked in methods for easily working with numbers larger than ~2^64.
  If I'm not mistaken though, this should be pretty straightforward in JS.

Issues: We'll find out . . .
  We found out. As usual, I was mistaken. By default JS only handles values up to 2^53.
  One work around here is that 2^1000 = 2^50 * 20. So, we can calc 2^50 and then do longform
  addition to resolve each integer place and then push it to an array, place by place.

Ideas: Calc 2^1000, break it into individual ints, sum the ints return the sum

*/

//Solution . . .

let bigNumber = Math.pow(2,1000);
let numberString = bigNumber.toString();
let sum = 0;

for (let i = 0; i < numberString.length; i++) {
    if (numberString[i] <= 9) {
        sum += parseInt(numberString[i]);
        console.log(numberString[i]);
    }
    if (numberString[i] === 'e') {
        console.log(`sum is ${sum}`)
        return
    }
}
