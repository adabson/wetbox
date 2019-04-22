var sumAll = function (...nums) {
    return nums.reduce((a, b) => a + b, 0); // 0 is the intial value
};
writeLn("sumAll(1,2,3,4,5)= " + sumAll(1, 2, 3, 4, 5));
var addOne = x => x + 1;
writeLn("1+1= " + addOne(1));
