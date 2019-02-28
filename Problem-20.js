// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .

  n! means n × (n − 1) × ... × 3 × 2 × 1

  For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
  and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

  Find the sum of the digits in the number 100!

*/

/*
On the face: This has some commong veins with problem 16, where the challenge was to find the sum
  of the digits of 2^1000. Guessing we'll be running into the same issues here. 100! will most
  likely be larger than max_safe_integer. Yep, a quick qoog tells me that its on the order of
  10e156. We should be able to solve this in largely the same fashion.

Issues: Since our max carryOver could be quite a bit larger, we'll almost certainly have to make our
  method for handling carry a bit more sophisticated.

  Further, I solved problem 16 by holding the result in an array of ints where each index represented
  one hexadecimal number place (1s, 10s, 100s, etc). This worked alright, but I'd like to see if I
  can find a more elegant solution.

Ideas:  Try to implement a more elegant method for multiplying large numbers than that used in #16.
  or not. Because 16 should work just fine with minimal modification.

  Nope. Modified version of 16 works up to a point but it breaks when you start getting double digit
  carryOvers. Working by hand, it looks like the problem is that I'm trying to handle the distributive
  multiplication and carryover operations in one pass over the array which is where things get muddled
  but if I do the distributive multiplication in one pass and then the carrover in another, it should
  be fine.

*/

//Solution . . .
let bigNumber = [1];
let sum = 0;
let n = 1; //n, of n! fame

//rinse and repeat until final factorial value is reached
while (n <= 100) {
    //1.loop through and do distributive multiplication on the array.
    for (let i = 0; i < bigNumber.length; i++) {
        bigNumber[i] *= n;
    }

    let carryOver = 0;
    //2.then loop again and work the carryovers
    for (let j = 0; j < bigNumber.length; j++) {
        let current = bigNumber[j];
        let next = bigNumber[j+1] || 0; //make sure we don't get tangled up with NaN.

        if (current > 9) {
            carryOver = (current - (current%10))/10;
            current = current%10;
            next += carryOver;
            bigNumber[j] = current;
            bigNumber[j+1] = next;
        }
        else {
            carryOver = 0; //just for safeties
        }
    }
    //3.increment factorial value so process can be repeated
    n++;
}

bigNumber.map((x) => {sum += x}); //add each the value of each index to sum
console.log(sum);
