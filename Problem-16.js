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

Ideas: Calc 2^1000, break it into individual ints, sum the ints return the sum. Doesn't work because
  vary large ints. Calc to 2^50 and do long form addition of 2^50+2^50 twenty...nope, because math
  times place by place to resolve each number place. I.e. 2^50 = 1125899906842624. 4*20 = 80 ergo,
  1s place = 0 2*20 + 80 = 120 ergo 10s place = 2 and so on...So, implement a function that does
  long form addition and records the result as a string or array. Nope. Because my math is wrong.
  Long form multiplication is what we want because exponents. 4^4 =/= 4^2 * 2. 4^4 == 4^2 * 4^2.
  So, 2^1000 == 2^50 * 2^50 * 2^50 . . . until repeated twenty times. This will stil result in
  numbers > max safe int. So, will have to the math with string processing methods. Think
  strint or Big JS. I'm not sure why I'm having such difficulty with this one.

  Or . . . we can set up an array to hold the value of 2^n starting w/ 1. Each index in the array
  holds a number place. We iterate over the array n times multiplying each index by 2 and each time
  the index gets above 10, we lop off the excess and add it the next next index up. It's slightly
  ungainly but should let us operate on arbitrary length ints for the required purpose. We can
  figure the carry by taking index.value - (index.value mod 10) and bubbling up the index position
  until no more carry. But, for this specific case, worst we're going to see is 2*9 = 18 can just
  do index.val - 10 which is computationaly faster than running the mod.

*/

//Solution . . .
let bigNumber = [1]; //2^0 === 1
let sum = 0;
let n = 1000; //n === exponent value

/*
  this will leave us with array of length n and a bunch of insignificant digits. That's okay because
  it will just be a bunch of trailing zeros. If we wanted to be tidy, we could remove them. But, we
  can safely ignore them in this case because zeros wont affect the sum of our digits. Cheers.
  Print the array at the end if you don't follow, a la console.log(bigNumber);
*/

//loop n times for 2^n
for (let i = 0 ; i < n ; i++) {
    let carryOver = 0; //reset for each power iteration
    let endPoint = bigNumber.length + 1; //so we don't overshoot the end of the array
    for (let j = 0 ; j < endPoint ; j++) {
        let digit = bigNumber[j] || 0; // || 0 so we can still add the prev. carry if needed

        digit = digit * 2 + carryOver;

        if (digit > 9) { //if we have carryOver, lop off the 10s place so we can bubble it up
            digit -= 10;
            carryOver = 1;
        } else { //else, be sure not to accidentally bring any carryOver with you
            carryOver = 0;
        }
        bigNumber[j] = digit;
    }
}

bigNumber.map((x) => {sum += x}); //add each the value of each index to sum
console.log(sum);
