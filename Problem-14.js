// User: thorn67    pass: wouldn't you like to know!
/*Problem Statement . . .
    The following iterative sequence is defined for the set of positive integers:

    n → n/2 (n is even)
    n → 3n + 1 (n is odd)

    Using the rule above and starting with 13, we generate the following sequence:

    13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
    It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

    Which starting number, under one million, produces the longest chain?

    ***note***: Once the chain starts the terms are allowed to go above one million.
*/

/*
On the face: Need n, a step/term counter, and a placeholder for the highest number of terms found yet

Issues: seems straightforward. just lots of computation.

Ideas: loop with if branches, each one increments step counter, when loop ends, compare step counter w/ record

There are probably nicer heuristics I could come up with that would let me refine the numbers we need to check
but, I'm just going to say, there's probably a rough correlation between the size of the number and the
number of terms required. So, I'll only check the top 250,000 at first and see if that turns up the answer.
*/

//Solution . . .

//n placeholder
let termRecord = 1;
let term = 0;
for (let n = 999999; n >= 1; n--) {
    let i = n;
    let termCounter = 1;
    //console.log(`n = ${n}`);
    while (i > 1) {
        if (i%2 === 0) {
            i = i/2;
            termCounter++;
            //console.log(`--> ${i}`);
        }
        else {
            i = 3*i +1;
            termCounter++;
            //console.log(`--> ${i}`);
        }
    }
    if (termCounter > termRecord) {
        termRecord = termCounter;
        term = n;
    }

}
console.log(termRecord);
console.log(term);
