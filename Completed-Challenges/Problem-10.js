//The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17
//Find the sum of all the primes below two million

/*
    Firt blush: brute force OR implement the sieve of aritosthenes, programatically
        1. function tightenSieve(prime>1) pushes all multiples of a prime to an array of non primes
        2. each prime found is pushed to an array of primes.
        3. after 2,000,000 threshhold is crossed, sum the primes array
        4. print
*/

//Brute Force . . .
//Leans out memory requirements but is computationally inefficient

let sum = 0;

function isPrime (integer) {
    for ( let x = 2 ; x <= Math.sqrt(integer) ; x++ ) {
        if ( integer%x === 0 ) {
            return false;
        }
    }
    return true;
}

for ( i = 2; i <= 2000000 ; i++) {
    if (isPrime(i)) {
        sum += i;
    }
}
console.log(sum);
//takes ~7 min to reach i == 2000000. Definitely need to figure out a faster solution.
//optimized by limiting x <= Math.sqrt(integer) rather than x <= integer/2 because maths
