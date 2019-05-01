// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .

  Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly
  into n). If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a
  and b are called amicable numbers.

  For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore
  d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

  Evaluate the sum of all the amicable numbers under 10000.

*/

/*
On the face: Brute force for this is going to require a considerable number of steps. At minimum, we
  would need to find all proper divisors and the subsequent d(n) for all numbers under 10000. We
  would need to store each corresponding n : d(n) pair, and then iterate through each pair looking
  for matches. Off the cuff, thats checking n%i === 0, 10000! times, recording and summing the vals
  where n%1 === 0 in the range of 2n = 20,000 to (n/2)! = 5000! times, then checking somewhere on
  order of (n/2)! = 5000! cases for matches. So, roughly o(n) = n! + 2n + (n/2)! + (n/2)! = 2n! + 2n

Issues:

Ideas: If brute forcing the solution, we can at least save on memory by only saving any values if we
  confirm a pair of amicable numbers. So, we can find all divisors by dividing by whole numbers less
  than or equal to sqrt(n).

*/

//Solution . . .

let sum = 0;

for (let i = 1; i < 10000; i++) {
    let b = d(i);
    let a = d(b);
    if ((a === i) && ( a !== b)) {
        //a & b are amicable numbers
        console.log(a, b);
        sum += a;
        //dont add b, because it will be encountered as a at the next occurence
    }
}

//find and sum all even divisors of given number n
//works for n > 1. Don't need to worry about n=1 because d(n) = 0 and d(0) =/= 1
function d(n) {
    let divisorSum = 1;
    for (i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            //i is even divisor
            divisorSum += i;
            if (n/i !== i) {
                divisorSum += n/i;
            }
        }
    }
    return divisorSum;
}


console.log(sum);
