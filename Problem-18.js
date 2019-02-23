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

  Find the maximum total from top to bottom of the triangle below:

                                          75.
                                         95 64.
                                        17 47 82.
                                       18 35 87. 10
                                      20 04 82. 47 65
                                     19 01 23 75. 03 34
                                    88 02 77 73. 07 63 67
                                   99 65 04 28. 06 16 70 92
                                  41 41 26 56 83. 40 80 70 33
                                 41 48 72 33 47 32. 37 16 94 29
                                53 71 44 65 25 43 91. 52 97 51 14
                               70 11 33 28 77 73 17 78. 39 68 17 57
                              91 71 52 38 17 14 91 43 58. 50 27 29 48
                             63 66 04 68 89 53 67 30 73. 16 69 87 40 31
                            04 62 98 27 23 09 70 98 73 93. 38 53 60 04 23

  Note: As there are only 16384 routes, it is possible to solve this problem by trying every route.
  However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot
  be solved by brute force, and requires a clever method! ;o)

*/

/*
On the face:
  The tempting first thought is to start at the default value in the top, and jump from to the
  highest adjacent value over and over. Of course, this doesn't work unless we get really lucky.
  Really. Lucky. So, perhaps the way to go is to look two or three rows at a time, find the two
  adjacent numbers that result in the highest value and try to connect them. If we take the example
  triangle, we know we start at 3, so our next choice is -->7-->4 OR -->4-->6 7+4=11 > 4+6=10 ==> 7+4
  wins.
  Tried this by hand as a sanity check and it resulted in the correct answer. Did I just get
  lucky or did I have the right idea? I'm not convinced I'm right. Route I found is marked above by
  periods adjacent to each number in the route.

Issues:
  I think I'm just lucky. Let's see if I can design a triangle that will purposely lead this method
  astray . . . yeah I definitely can.
                                            1
                                           1 2
                                          1 1 2
                                         1 1 1 2
                                        9 1 1 1 2
                                       9 1 1 1 1 2
                                      9 1 1 1 1 1 2
  This would lead use 1->2->2->2->2->2->2 = 13 when the optimal path is 1->1->1->1->9->9->9 = 31.

  Obviously this is an edge case we're unlikely to encounter if we generalized this solution and
  tried to apply it to a set of randomized triangles. But still quite possible as essentially all
  that is required is a 'valley' of low values separating an origin-contiguous 'ridge' of moderate
  values from another 'ridge' of high values.

Ideas:
  This could probably be solved by applying the same method from bottom up, using each position in
  the triangle base as a starting point. Then taking the highest value route found from those tried.
  There would still be cases where it could strike out. But it should be overwhelmingly likely to
  work.
  I am imagining ways this could be further optimized but this is meant to be a quick brainteaser
  and I don't want or need to over engineer this. Also, if we use each value on the base as a seed
  and run from the bottom up, we'll cover the route we would get from top down by default and so
  don't need to bother running it top down.

  I just realized, I'm constraining myself, needlessly, by focusing so much on PATH when I should be
  focusing on VALUE. We don't need to consider every, or even most, paths, be cause we can just
  crash down through the rows min/max comparing each addition from the above row, A la:
       3
      7 4         10 7
     2 4 6 ==>   2  4  6 ==> 12 14 13 ==>            ==> 23 > 20, 19, 16 ==> max value = 23
    8 5 9 3    8  5  9  3   8  5  9  3    20 19 23 16

  This way, we don't have to worry about missing any paths, because we implicitly consider them all
  by focusing on value instead. And this method can be applied top down or bottom up without
  significant concerns regarding performance. This won't neccesarily result in the fastest possible
  solution, but it should be the fastest method that we know will work for any data set given
*/

//Solution . . .

/*
  As usual, I came up with an idea for the solution without much thought to how I could implement
  it. So, it seems like I need just need to figure out a way to read in and iterate over the data
  without losing it's structure.
*/

let data = "75\n95 64\n17 47 82\n18 35 87 10\n20 04 82 47 65\n19 01 23 75 03 34\n88 02 77 73 07 63 67\n99 65 04 28 06 16 70 92\n41 41 26 56 83 40 80 70 33\n41 48 72 33 47 32 37 16 94 29\n53 71 44 65 25 43 91 52 97 51 14\n70 11 33 28 77 73 17 78 39 68 17 57\n91 71 52 38 17 14 91 43 58 50 27 29 48\n63 66 04 68 89 53 67 30 73 16 69 87 40 31\n04 62 98 27 23 09 70 98 73 93 38 53 60 04 23";
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
for (let i = (data.length - 1) ; i >= 0 ; i--) {
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
