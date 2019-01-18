 //zero-indexed
let basePool = [
	[0, 1, 2, 3, 4, 5], 
	[6, 7, 8, 9, 10, 11], 
	[12, 13, 14, 15, 16, 17],
	[18, 19, 20, 21, 22, 23], 
	[24, 25, 26, 27, 28, 29], 
	[30, 31, 32, 33, 34, 35], 
	[36, 37, 38, 39, 40, 41], 
	[42, 43, 44, 0, 1, 2], 
	[3, 4, 5, 6, 7, 8], 
	[9, 10, 11, 12, 13, 14], 
	[15, 16, 17, 18, 19, 20], 
	[21, 22, 23, 24, 25, 26], 
	[27, 28, 29, 30, 31, 32], 
	[33, 34, 35, 36, 37, 38],
	[39, 40, 41, 42, 43, 44]
];

N = 45;
K = 6;

M = 48; // multiplier. (45*2)/2 = 15 (flattest distribution), 15*48=720 (basepool.length)

let blankSlate = [];
for(let i=0;i<48;i++) { 
  blankSlate = blankSlate.concat(JSON.parse(JSON.stringify(basePool)));
}

//genetic algo approach again :)

tiks = JSON.parse(JSON.stringify(blankSlate));
let state = new Array(14190).fill(0);