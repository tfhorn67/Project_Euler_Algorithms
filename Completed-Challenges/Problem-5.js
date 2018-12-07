//Problem Statement:
//2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
//What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

//Preliminary Ideas:
//Do a bunch of math in a hurry.

//Solution:

let a = 1; //a is the number to be divided into
let b; //b is a variable for numbers 1 - 20 inclusive

divideABunchOfNumbers();
console.log(a);

function divideABunchOfNumbers() {
  for ( b=1 ; b<21 ; b++) {
    if ( a%b !== 0 ) {
      a++;
      b = 1;
    }
    if ( b===20 && a%b === 0 ) {
      return a;
    }
  }
}
