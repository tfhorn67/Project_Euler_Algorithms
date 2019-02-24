// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .

  By starting at the top of the triangle below and moving to adjacent numbers on the row below, the
  maximum total from top to bottom is 23.

                                           3
                                          7 4
                                         2 4 6
                                        8 5 9 3

  That is, 3 + 7 + 4 + 9 = 23.

  Find the maximum total from top to bottom in triangle.txt (right click and 'Save Link/Target
  As...'), a 15K text file containing a triangle with one-hundred rows.

  Note: This is a much more difficult version of Problem 18. It is not possible to try every route
  to solve this problem, as there are 2^99 altogether! If you could check one trillion (10^12)
  routes every second it would take over twenty billion years to check them all. There is an
  efficient algorithm to solve it. ;o)

*/

/*
On the face:
  I cracked this one on problem 18. See the write up there for the logic on this solution.

Issues: I left my wallet in El Segundo.

Ideas: I gotta get. I got-got to get it.

  But really though, the only thing different with this one should be that I need to read the data
  in from the txt file rather than directly input it as a string.

  I know the magic of Node is the async I/O and the purists would hate me but I'm just going to
  buffer the txt file instead of reading it incrementally because this isn't the point here and
  I can set up the buffering faster.

*/

//Solution . . .

let fs = require('fs');

let data;

//read .txt file
try {
    data = fs.readFileSync('p067_triangle.txt', 'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}

//parse it to desired format
data = data.split("\n");

data = data.map(function (current, index) {
    return current.split(" ");
});


for (let i = 0 ; i < data.length ; i++) {
    data[i] = data[i].map(function(current, index) {
        return parseInt(current, 10);
    });
}

/*
  now we have data as a 'two dimensional' array (close as can get in js, anyway) so we can access
  desired values as data[row][column] and allowable paths from data[row][column] are to either
  data[row+1][column] OR data[row+1][column+1] i.e. from 75 at top we can go to 95 or 64.
*/

//crash from bottom up so we get one int as result instead of array of ints that has to be sorted.
for (let i = (data.length - 2) ; i >= 0 ; i--) {
    let prevRow = data[i];
    let currRow = data[i-1];
    if (currRow) {
        for (let j = 0 ; j < currRow.length ; j++) {
            currRow[j] = Math.max( (currRow[j] + prevRow[j]), (currRow[j] + prevRow[j+1]) );
        }
    }
}

//log the solution
console.log(data[0]); //1074
