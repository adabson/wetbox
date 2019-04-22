function getType<T>(val: T): string{
	return typeof(val);
}

var aStr = "A String";
var aNum = 10;

writeLn(getType(aStr));
writeLn(getType(aNum));