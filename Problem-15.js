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

  I figured I did pretty well figuring out a clever, if slow, brute force solution and I've never
  been good at combinatric analysis. So, I took to the internet for help problem solving this. From
  what I can see, this problem, for a generalized grid size, can be taken as a subset of Pascal's
  Triangle solutions, so we should be able to solve it using a programatic implementation of one of
  the formulas for finding values in Pascal's Triangle . . .

  So, yep, Pascal's Triangle is a very well understood combinatrics problem with many well defined
  solutions. The one I'll implement is that the 'value' of any point (n, k) in the triangle, where
  n = layer # in the triangle from top down and k = number of step from the left side of the
  triangle can be taken as n!/(n!(n-k)!). This triangle can be rotated to align with our grid
  system. From this alignment, we can see that (n, k) translates to n = the non back tracking
  orthogonal path length from the origin to the destination and k = the horizontal distance from the
  origin to the destination. In other words, for any point (x, y) on the grid,
  (n, k) = ((|x|+|y|), |x|)

  This solution is much faster and much more elegant.
*/

//Solution . . .

//need to be able to take factorials
function factorial(number) {
    //for the safety
    if (number < 0) {
        return -1;
    }
    //0! = 1
    if (number == 0) {
        return 1;
    }
    //set up some recursive dominos. Knock them down once we get 0!.
    if (number > 0) {
        return (number * factorial(number-1));
    }
}

//path length from origin to destination, along grid lines. horizontal distance as |x| from (x,y)
function pascalsTriangle(pathLength, horizontalDistance) {
    return ( factorial(pathLength) / (factorial(horizontalDistance) * factorial(pathLength - horizontalDistance)));
}
//return value of desired location.
console.log(pascalsTriangle(40,20));
