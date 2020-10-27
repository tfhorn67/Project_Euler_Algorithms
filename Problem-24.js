// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .
    A permutation is an ordered arrangement of objects. For example, 3124 is one
    possible permutation of the digits 1, 2, 3 and 4. If all of the permutations
    are listed numerically or alphabetically, we call it lexicographic order. The
    lexicographic permutations of 0, 1 and 2 are:

    012   021   102   120   201   210

    What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

*/

/*
On the face: The primary issue to tackle here is how to efficiently generate
    the requisite permutations? I guess the lazy in me wants to say 'do we need
    to generate and order all permutations?' The math should be pretty straightforward.
    We could maybe cheat a bit by figuring out which end of the range our millionth
    value is closer to and how far from it it is, start on that end, work towards
    the millionth permutation and stop on arrival. Maybe there's a pattern we can
    suss out that would allow us to move through permutations as if counting. Maybe
    there's some clever logic that would allow us to shortcut things. I'll start
    by reducing the problem to a simpler scenarios like finding the third permutation
    of 0,1,2 or something like that and see how it looks.

Issues: Whether we can generate permutations in lexicographic order directly
    or we have to generate permutations and then arrange in lexicographic order.
    Or if there is some convenient 'shortform' method.

Ideas:
    Spent some time working with this on pen and paper. Simplifying this one
    helps suss out a solution pretty well. We see the seedling of the idea in
    the problem statement with 012, 021, 102, 120, 201, 210. Not quite clear but
    there are obvious signs of symmetry and patterns here that could be exploited.
    So we have an integer space [0,1,2] and a permutation space...
    for 0,1,2 there are 3! permutations, and by inspection above we see there are
    3 sets of 2! ordered sets (3 x 2! = 3!) ==> [012, 021], [102, 120], [201, 210]

    Let's make it slightly more complex to allow more iterations for the pattern
    to become clear. Let's try to figure the 7th value (index 6) of the
    lexicographic order of [0,1,2,3] (conveniently pre marked with ** below)...

    So we have our integer space [0,1,2,3]
    Our 'solution' space...currently empty []
    And our permutation space of 4! permutations or, more conveniently, 4 sets of
    3! permutations a la...

    digit space [0,1,2,3]
    solution space []

    set 0       set 1       set 2       set 3
    [0,1,2,3]  *[1,0,2,3]*  [2,0,1,3]   [3,0,1,2]
    [0,1,3,2]   [1,0,3,2]   [2,0,3,1]   [3,0,2,1]
    [0,2,1,3]   [1,2,0,3]   [2,1,0,3]   [3,1,0,2]
    [0,2,3,1]   [1,2,3,0]   [2,1,3,0]   [3,1,2,0]
    [0,3,1,2]   [1,3,0,2]   [2,3,0,1]   [3,2,0,1]
    [0,3,2,1]   [1,3,2,0]   [2,3,1,0]   [3,2,1,0]

    Our permutation space is arranged into 4 sets with common 1st digits and  of length n-1!
    and you will find that our desired index / set length! = 6 / 3! = 6 / 6 = 1 R 0.
    This quotient points us to set 1. all values in this set begin with 1. 1 is our first integer.
    Now lets rewrite this set 1 without the value 1...

    digit space [0,2,3]
    solution space [1]

    set 0     set 1    set 2
    [0,2,3]   [2,0,3]  [3,0,2]
    [0,3,2]   [2,3,0]  [3,2,0]

    This leaves us 3 sets of 2! length. If we look, the remainder of the value
    we want is at index 0, corresponding to our remainder of 0 from the prior
    operation... 0 is now our new desired index position.

    0 / 2! = 0 R 0 == set 0, all of which start with 0. 0 is our next digit.

    rinse and repeat...

    digit space [2,3]
    solution space [1,0]

    set 0   set 1
    [2,3]   [3,2]

    0 / 1! = 0 R 0. Set 0 all start with 2. 2 is our next digit.

    digit space [3]
    solution space [1,0,2]

    By process of elimination we can see 3 is last.

    Thus...

    digit space []
    solution space [1,0,2,3]

    Now, constructing all these matrices and working through them would be
    cumbersome and computationally expensive and may not end up being any better
    than brute force. But, if you notice, every time we reconstructed the permutation
    space, each set's first digit corresponds to the same digit and its index in
    the remaining digit space. This means that as longs as we maintain the ordered
    digit space and the solution space and remember how many layers into the onion
    are, we should be able to solve this without any of the computational and memory
    expenses of generating, storing, traversing all those matrices for each iteration.

    A la...

    10th value (9th index) in [0,1,2,3] permutaions...
    solution space []  digit space [0,1,2,3]
    9 / 3! = 1 R 3
    solution space [1] digit space [0,2,3]
    3 / 2! = 1 R 1
    solution space [1,2] digit space [0,3]
    1 / 1! = 1 R 0
    solution space [1,2,3] digit space [0]
    0 / 0! = 0 R 0
    solution space [1,2,3,0] digit space []

    So, this should reduce the problem to a bit of simple arithmatic, storage of
    2 short arrays and a bit of looping or recursion...
*/

//Solution . . .
let digitSpace = [0,1,2,3,4,5,6,7,8,9]; //Only change by removed index that matches dividend in each loop
let solution = []; //when you splice out a value from the digitSpace array, pop it to the solution array
let onionLayer = 10; //this will be the divisor, reduce by one at end of each loop
let desiredIndex = 999999; //This will be the starting dividend. Replace with the quotient at end of each loop
let permutationSpace = factorialize(onionLayer); //probably don't really need this, just decrement onionLayer every loop and factorialize

// function factorial(int) { //save time on running through factorials.
function factorialize(num) {
  if (num < 0)
        return -1;
  else if (num == 0)
      return 1;
  else {
      return (num * factorialize(num - 1));
  }
}

//set up loop to run through layers
for (i = onionLayer; i--; i>=0) {
    //get quotient
    let quotient = Math.floor(desiredIndex/factorialize(i));
    //get remainder
    let remainder = desiredIndex % factorialize(i);
    //works so far. should just be a matter of properly reassigning variables and splicing/popping arrays now
    desiredIndex = remainder;
    solution.push(digitSpace[quotient]);
    digitSpace.splice(quotient,1);
    console.log(`digitSpace: ${digitSpace}`);
}

console.log(`solution: ${solution}`);
console.log(solution.join(''));


//so what is the process in simple language...



//console.log(solution);
