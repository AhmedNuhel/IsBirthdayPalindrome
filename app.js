function reverseStr(Str){
    var reversedStr = Str.split("").reverse().join("");
    return reversedStr;
}
function checkPalindrome(Str){
    var reverse = reverseStr(Str);
    return Str === reverse;
}
function convertDateToString(date){
    var dateStr ={ day : "",month : "",year : ""}
    if (date.day<10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if (date.month<10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr
}
function getDateAllFormats(date){
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year ;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year ;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day ;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2) ;
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2) ;
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day ;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}
function checkPalindromeForAllDateFormats(date){
    var listOfPalindrome = getDateAllFormats(date);
    var palindrome = false;
    for(var i = 0 ; i < listOfPalindrome.length ; i++){
        if(checkPalindrome(listOfPalindrome[i])){
            palindrome = true ;
            break ; 
        }
    }
    return palindrome;
}
function isLeapYear(year){
    if (year % 400 === 0){
        return true;
    }
    if(year % 100 === 0 ){
        return false;
    }
    if(year % 4 === 0 ){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1 ;
    var month = date.month ;
    var year = date.year ;

    var daysInMonth = [ 31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31 ];
    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }
            else{
                if(day>28){
                    day = 1;
                    month++;
                }
            }
    }else{
        if(day>daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }
    if(month>12){
        month = 1;
        year++;
    }
    return {
        day: day,
        month : month,
        year: year
    };
}
function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);
    while(1){
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter , nextDate] ;
}
//  var date ={
//      day :"" ,
//      month :"" ,
//      year : ""
//  };
var checkButton = document.querySelector("#btn");
var inputDate = document.querySelector("#input-date");
var outputMsg = document.querySelector("#output-msg")
checkButton.addEventListener('click',clickHandler)
function clickHandler(){
    var bdayStr = inputDate.value;
    if(bdayStr !== ""){
        var listOfDate = bdayStr.split("-");
        var date = {
            day : Number(listOfDate[2]),
            month :Number(listOfDate[1]),
            year : Number(listOfDate[0])
        };
        var isPlalindrome = checkPalindromeForAllDateFormats(date);
        if(isPlalindrome){
            outputMsg.innerText = "Your birthday is a palindrome"
        }else{
            var [counter,nextDate] = getNextPalindromeDate(date)
            outputMsg.innerText = `Your birthday is not a palindrome \n The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year},you missed by ${counter} days`
        }
    }
}
