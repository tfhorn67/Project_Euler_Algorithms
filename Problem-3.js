//Problem Statement:
//The prime factors of 13195 are 5, 7, 13 and 29.
//What is the largest prime factor of the number 600851475143 ?

//Preliminary Ideas:
//So, we need...
//a function to find primes "checkIfPrime"
//a function to determine if primes are a factor or not "checkIfPrimeFactor"
//an array to store prime factors "primeFactors"
//Then each time a prime factor is found, push it to primeFactors
//Then repeat the process, this time dividing into the quotient of the first prime factor and the original dividend
//Rinse and repeat until no more prime factors
//Then, check the array. The last value should be the largest prime factor.

//Solution:
let primeFactors = [];
let originalDividend = 600851475143;

primeFactorSieve(1,originalDividend);
console.log(primeFactors);
console.log(primeFactors[primeFactors.length - 1]);

function checkIfPrime (integer) {
  for ( let i = 2 ; i <= integer/2 ; i++ ) {
    if ( integer%i === 0 ) {
      return false;
    }
  }
}

function checkIfPrimeFactor (integer, dividend) {
  if ( dividend%integer === 0 ) {
    return true;
  }
}

function primeFactorSieve (integer, dividend) {
  for ( let i = integer ; i <= dividend ; i++ ) {
    if ( (checkIfPrime(i) !== false) && (checkIfPrimeFactor(i, dividend) === true) ) {
      primeFactors.push(i);
      dividend = dividend/i;
      i = integer;
    }
  }
}
