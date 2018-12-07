// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
//
// a2 + b2 = c2
// For example, 32 + 42 = 9 + 16 = 25 = 52.
//
// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

/*
    At a first blush, the general should look something like this:
        1: generate triplet
        2: is it pythagorean?
            (y): is a + b + c === 1000?
                (y): return a * b * c
                (n): restart with next triplet
            (n): restart with next triplet

    Tricky parts: whats the best way to generate and check combinations to see if pythagorean?
        there's an algebraic method for generating the other two legs from 1 leg, but might
        not lend itself to progromatic methods any more than brute force methods.

    Brute Force: for every whole integer 'a' there exists a pythagorean triple completed by 'b' & 'c'
        iterate through a & b vals until sqrt(a^2 + b^2) is a whole integer --> c. this will be a
        pyth. triple. check it from there. A bit of time could be shaved because we know we can
        exclude a decent number of the smaller triples. But, this would still require a lot of computations.

*/

//I'm sorry for all the nesting. I just wanted to chug out an answer not make beautiful code
for ( b = 1 ; b< 500 ; b++ ) {
    for ( c = 1 ; c < 500 ; c++ ) {
        if ( Math.sqrt( ( c * c ) - ( b * b ) ) !== 0 ) {
            a = Math.sqrt( ( c * c ) - ( b * b ) );
            if ( a + b + c === 1000 ) { // a: 200, b:375, c: 425
                console.log(a * b *c); //31875000
            }
        }
    }
}
