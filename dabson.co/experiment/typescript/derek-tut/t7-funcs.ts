var getSum = function(
	num1: number, 
	num2: number): number { //final :number is the return type
	return num1 + num2;
}

var theSum1: number = getSum(5,2);
writeLn("5+2= "+ theSum1);

// num3?  is an optional parameter
var getDiff = function(num1: number, num2 = 2, num3?: number):number {
	if (typeof num3 !== 'undefined') {
		return num1 - num2 - num3;
	}
	return num1 - num2;
}

writeLn("5-2= " + getDiff(5,2));
writeLn("5-2-3= " + getDiff(5,2,3));
