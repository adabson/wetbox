var getSum = function (num1, num2) {
    return num1 + num2;
};
var theSum1 = getSum(5, 2);
writeLn("5+2= " + theSum1);
// num3?  is an optional parameter
var getDiff = function (num1, num2 = 2, num3) {
    if (typeof num3 !== 'undefined') {
        return num1 - num2 - num3;
    }
    return num1 - num2;
};
writeLn("5-2= " + getDiff(5, 2));
writeLn("5-2-3= " + getDiff(5, 2, 3));
