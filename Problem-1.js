//Problem Statement:
//If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
//Find the sum of all the multiples of 3 or 5 below 1000.

//Preliminary Ideas:
//write a function to filter out relevant multiples, push each multiple to an array
//take the sum of all the values in the array. This should provide the correct answer.
//Note: We don't need the array, explicitly, but it's a nice easy way to check that we're
//filtering out the correct multiples

//Solution Attempt:
let multiplesArray = [];
let multSum = 0;

for ( let i=1 ; i<1000 ; i++) {
  if ( i%3 === 0 || i%5 === 0 ) {
    multiplesArray.push(i);
    multSum += i;
  }
}

//If the function works, the array will contain correct values and multSum will end at the correct sum value.
console.log(multiplesArray);
console.log(multSum);

//It worked! Correct answer is 233168
