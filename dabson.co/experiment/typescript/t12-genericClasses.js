class GenericNumber {
}
var num1 = new GenericNumber();
num1.add = (x, y) => { return x + y; };
writeLn("5+4= " + num1.add(5, 4));
// ---- String 
var str1 = new GenericNumber();
str1.add = (x, y) => { return String(Number(x) + Number(y)); };
writeLn("'5'+'6'= " + str1.add('5', '6'));
