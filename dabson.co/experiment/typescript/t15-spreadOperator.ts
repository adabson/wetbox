function theSum(x,y,z): void{
	writeLn("Sum: "+(x+y+z));
}

var args = [4,5,6];

theSum(...args);