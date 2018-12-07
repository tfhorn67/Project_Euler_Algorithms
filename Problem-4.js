//Problem Statement:
//A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
//Find the largest palindrome made from the product of two 3-digit numbers.

//Preliminary Ideas:
//For the product of all 3 digit numbers we need to check if palindrome or not.
//Since we want the largest, it makes sense to start with the largest 3 digit numbers and work down
//Perhaps the best way is to start with 999X999 then 999X998, 999X997, 999X996 . . . 999X100
//Then move to 998X998, 998X996, etc. pushing all palindrome products to an array
//When finished, reorder the array by numerical order and pick the largest.

//Solution:

let product;
let palindromeArray = []

multiplyABunchOfNumbers();
palindromeArray.sort(function(a, b){return a-b});
console.log(palindromeArray[palindromeArray.length - 1]);

function multiplyABunchOfNumbers() {
  for ( a = 999; a>99; a-- ) {
    for ( i=999 ; i>99 ; i--) {
      product = a * i;
      if ( product == product.toString().split('').reverse().join('') ) {
        palindromeArray.push(product);
      }
    }
    a--;
  }
}
