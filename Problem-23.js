// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .
  A perfect number is a number for which the sum of its proper divisors is exactly equal to the
  number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which
  means that 28 is a perfect number.

  A number n is called deficient if the sum of its proper divisors is less than n and it is called
  abundant if this sum exceeds n.

  As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be
  written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that
  all integers greater than 28123 can be written as the sum of two abundant numbers. However, this
  upper limit cannot be reduced any further by analysis even though it is known that the greatest
  number that cannot be expressed as the sum of two abundant numbers is less than this limit.

  Find the sum of all the positive integers which cannot be written as the sum of two abundant
  numbers.
*/

/*
On the face:
  The wording in the problem statement is confusing, or I need another cup of coffee, or both.

  For n: if sum of divisors = n ==> n == perfect
         if sum of divisors < n ==> n == deficient
         if sum of divisors > n ==> n == abundant

  smallest abundant n == 12 ==> smallest sum of two abundants == 24

  all n > 28123 can be written as sum of two abundants

  some number n < 28123 is greatest sum which cannot be written as sum of two abundants

  i.e. we know that 28123 is not the actual limit, rather it is the limit we arrive at via mathematical analysis
  even though empirically we know the limit is actually lower

  find the sum of all positive n which **cannot** be written as sum of two abundants

  So, we know, at minimum, we can stop looking for numbers to add to the sum when we reach 28123. Effectively, we need
  to be able to determine if a number can be written as the sum of two abundants or not and we know we can stop looking
  once we hit 28123

  we definitely need a couple of functions:

  findDivisors(n) //finds all whole integer divisors of n
  taxonomize(n, divisors) //sums divisors of n and classifies n as abundant, perfect, or deficient
    --really just needs to classify ar abundant or not

  what to do next is where I'm a bit stumped.
    --The first idea that comes to mind is to find all abundants less than 28123 and store them in an
    array. Then generate a second array containing all possible 2-abundant sums from the array of abundants.
    From here we can sum all numbers less than 28123, provided they are not on our second array. This should
    yield the solution. It definitely seems like a clunky gross brute force method though. Small optimization can
    be seen in 'ideas' section, list item one.

Issues: ideas that come to mind at first involve what feels like highly inneficient methods

Ideas:

  1. loop through numbers < 28123, run finDivisors() and taxonomize() on each,
     if abundant, add to array of abundant ints;
     map over array to create second array holding all 2-abundants sums < 28123;
     sum all ints < 28123 and subtract out the sum of values in second array



*/

//Solution . . .
let solution = 0;
let numbers = []; //array to hold objects for all nums in relevant range

function findDivisors (int) { //returns unordered array of proper divisors for int
    //some divisor x is a proper divisor of int n if n % x === 0
    let divisors = [1];
    for (let i = 2; i <= Math.sqrt(int); i++) {
        if (int % i === 0) {
            divisors.push(i);
            divisors.push(int/i);
        }
    }
    divisors = [...new Set(divisors)];
    return divisors;
};

function taxonomize (int) { //determines if int is abundant
    let divisors = findDivisors(int); //find divisors
    let sum = divisors.reduce(function(sum, val) { return sum + val; }, 0); //sum divisors
    let abundant = sum > int ? true : false;
    return abundant;//if sum > int return int so it can be added to array of abundants
}

for (let i = 1; i < 28124; i++) { //loops thru must check numbers and marks abundants
    let int = i;
    let current = { //creates an object for current number prior to taxonomy
        number: int,
        abundant: false,
        abundSum: false
    };
    if (taxonomize(int)) { //taxonomizes current int and updates object accordingly
        current.abundant = true;
    }
    numbers.push(current); //push current ints object to array of int data
}

/*
so now we have all numbers in relevant range and know which are abundant
the obvious choice here for me is too run two nested loops.
loop 1 goes through each object in the array
if encounters abundant, step into loop 2.
loop 2 starts at that abundant works through all larger ones creating sums
mark each of those sums in existing array.
now array contains all nums in range, marked as abundant and t/f abundant sum.
lastly, loop through array once more and sum all ints marked as abundSum == false
*/

for (let i = 0; i < 28123; i++) { //nested loops find and mark all sums of abundants in range
    let current = i;
    if (numbers[current].abundant == true) {
        for (let i = current; i < 28123; i++) {
            if (numbers[i].abundant == true) {
                let sum = numbers[current].number + numbers[i].number;
                if (sum <= 28123) {
                    numbers[sum-1].abundSum = true;
                }
            }
        }
    }
}

//loop through fully taxonomized array adding all abundSum == false values to solution total
for (let i = 0; i < 28123; i++) {
    if (numbers[i].abundSum == false) {
        solution = solution + numbers[i].number;
    }
}




console.log(solution);
