var randVals = { x: 1, y: 2, z: 3 };
var { z, x, y } = randVals; //being an object, it grabs randVals reference by name, not order like array :)
writeLn(x + y + z);
[x, y, z] = [z, y, x]; // flip array [a,b] = [b,a]
writeLn('Switch' + x + y + z);
