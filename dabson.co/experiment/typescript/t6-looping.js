var randArray = [5, 6, 7, 8];
// for(x in y) prints INDEXES
for (var val in randArray) {
    writeLn(val);
}
var strArray = randArray.map(String);
writeLn("<hr>");
// for(x of y) prints VALUES
for (var val of strArray) {
    writeLn(val);
}
