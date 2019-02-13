// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .
Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down,
there are exactly 6 routes to the bottom right corner.

How many such routes are there through a 20×20 grid?
*/

/*
On the face: well, a twenty by twenty grid is just another way of writing a listing of 400 numbers.
  so, moving to the right is the same n = n+1; and moving down is the same as n = n + 20. So, the heart
  of the question is 'how many permutations of +1 and/or +20 are there to count from 1 to 400'. Right?

This is probably easier to reason through by just finding different ways to increment a set of x,y
  coords from [0, 0] to [20, 20]. This avoids the edge cases brought on by incrementing 0 to 400
  w/ +1 or +20 steps.

Maybe the coord system is not quite right eithe. I think perhaps generating paths and filtering
  duplicates may be best. We could reprsent paths with a binary encoding. for example,
  move right = 1, move down = 0; thusly, on a 2x2 grid, straight across and then down would be
  recorded as 1100 (right, right, down, down) whereas the opposite (down then across) would be 0011
  (down, down, right, right) and a zig zag would be 1010 (right, down, right, down). This works
  because the path length is always the same, so we just have to compare the path encodings to
  ensure no duplicates.

Issues: We'll find out.

Ideas: So, we could find the answer by elimination. Path length equals the encoding length i.e.
  on a 2x2 grid, path length is four as is encoding lenth (1100). So we can look at the set of all
  encodings of length four and eliminate any that have unequal amounts of 1s and 0s as these would
  lead to the incorrect destination on the grid or, more accurately, off of the defined grid. e.g.
  1110 would lead to [3,1] which is outside the grid area.

  Let's first implement on a 2 by 2 grid and scale it up from there.

  ...this idea works fine for small grids but does not scale well at all. by the time we get to
  grids of larger than ~10x10, performance drops off massively. Massively. We need a simpler
  solution. Possibly this could be reduced mathematically to a function of grid size, such that
  we only need to run a couple of operations rather than millions on millions.
*/

//Solution . . .

/*
  generatePaths is adapted from a method for generating all binary numbers of n length that I found.
  The bitwise operations paired with the looping is a bit confusing, but can be illuminated by
  taking simple cases, like pathLength of 2 or 3 and stepping through the logic by hand.
  I had to work this out on paper to understand how/why the method I found works.
  Consider it good practice working with bitwise operands that aren't super duper common. At least
  in typical JavaScript fair.
*/
function generatePaths(pathLength) {
    let paths = 0; //to hold count of paths
    //Math.pow(2,pathLength) generates the number of possible paths of length pathLength
    //i.e Math.pow(2,4) ==> 16 paths of length 4, of which six lead to the correct destination.
    for (let i = 0; i < Math.pow(2,pathLength); i++) {
        var path = []; //to hold individual paths
        for (let j = 0; j < pathLength; j++) {
            //bitwise magic. lop of j bits from the right side of i then and it with 1
            //basically, if i >> j ends in 1 in binary, return 1, else return 0
            if ((i >> j) & 1) {
                let temp = (i >> j) & 1;
                path.push(1);
            }
            else {
                path.push(0);
            }
        }
        //filter invalid paths by only pushing paths with equal number of 1s and 0s
        let balanceCount = 0
        path.map(function(currentVal, index, array) {
            if (currentVal === 1) {
                balanceCount++;
                //console.log(balanceCount);
            } else {
                balanceCount--
                //console.log(balanceCount);
            }
        });
        if (balanceCount === 0) {
            paths++;
        }
    }
    return paths;
}

let example = generatePaths(30);
console.log(example);
//console.log(example);
