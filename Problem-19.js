// User: thorn67 . . . pass: wouldn't you like to know!

/*
Problem Statement . . .

  You are given the following information, but you may prefer to do some research for yourself.

    - 1 Jan 1900 was a Monday.
      Thirty days has September,
      April, June and November.
      All the rest have thirty-one,
      Saving February alone,
      Which has twenty-eight, rain or shine.
      And on leap years, twenty-nine.

  A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible
  by 400.

  How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec
  2000)?

*/

/*
On the face: We have a defined origin and a clear set of rules, so its just a matter of applying the
  pattern out to our desired end point and observing the results. Essentially we have a few
  interlocking patterns and are looking for a subset of their intersection points.
  So we have 100 years,
             365 days/years
             12 months/year
             52 weeks/year
             7 days/week
             various days per month
  So, really we're just cycling through week-endings and month startings to see when they sync, and
  we need to keep track of where we are, year wise so we can adjust for leap years.

Issues: The period we need to track starts a year later than our given date (monday, jan 1 1900).
  so, we need to find jan 1, 1901. 365/7 = 52 weeks 1 day ==> Jan 1 1901 == Tuesday. And being lazy
  and looking at the calendar, Dec. 31, 2001 == Sunday.

Ideas:

*/

//Solution . . .
let isLeapYear = false;

let currentDay = 1; //Start tuesday, Jan 1 1901

let months = [31, (isLeapYear ? (29) : (28)), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let currentMonth = 0;

let specialSundays = 0;

//day0 == monday, day6 == sunday
function weekCycler (day) {
    day += 1;
    if (day > 6) {
        day = 0;
    }
    return day
}

//Pass in month.length, cycle through days of week over length of month
function monthCycler (month) {
    //cycle through days of the month
    for (let i = 0 ; i < months[currentMonth] ; i++) {
        //Check if it's one of our sundays and increment the count if true
        if ((i === 0) && (currentDay === 6)) {
            specialSundays++;
        }
        currentDay = weekCycler(currentDay);
    }
    //increment currentMonth
    month++;
    if (month > 11) {
        month = 0;
    }
    return month;
}

function yearCycler (year) {
    checkLeapYear(year);
    for (let j = 0 ; j < months.length ; j++) {
        currentMonth = monthCycler(currentMonth);
    }
}

function checkLeapYear (year) {
    //non leap years
    if (year%4 !== 0) {
        isLeapYear = false;
    }
    //century leap years
    if ((year%4 === 0) && (year%100 === 0) &&(year%400 === 0)) {
        isLeapYear = true;
    }
    //century non leap years
    if ((year%4 === 0) && (year%100 === 0) && (year%400 !== 0)) {
        isLeapYear = false;
    }

    //plain old leap years
    if ((year%4 === 0) && (year%100 !== 0)) {
        isLeapYear = true;
    }
}

//run yearCycler() on every year in range
for (let k = 1901 ; k < 2001 ; k++) {
    yearCycler(k);
}




//log the solution
console.log(specialSundays);
