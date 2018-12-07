//Problem Statement:
//By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
//What is the 10,001st prime number?

//Preliminary Ideas:
//Recycle some of the functions from earlier challenges to sieve primes from non primes
//Push primes to an array and stop the seive when array.length === 100001.
//Print array[array.length-1];

//Solution:

let primesTimes = [];
let number = 2;

while (primesTimes.length !== 10001) {
  if (checkIfPrime(number) !== false) {
    primesTimes.push(number);
  }
  number++;
}

console.log(primesTimes[primesTimes.length - 1]);

function checkIfPrime (integer) {
  for (let i = 2 ; i <= integer/2 ; i++) {
    if (integer%i === 0) {
      return false;
    }
  }
}
