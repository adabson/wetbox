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
P = 3;
M = 10; //48; // multiplier. (45*2)/2 = 15 (flattest distribution), 15*48=720 (basepool.length)

let blankSlate = [];
for(let i=0;i<M;i++) { 
  blankSlate = blankSlate.concat(JSON.parse(JSON.stringify(basePool)));
}
tiks = JSON.parse(JSON.stringify(blankSlate)); //deep copy initialize
maxPossible = blankSlate.length * choose(K, P); //given 15*M tickets and 20 3-pairings per ticket



function coverage(tiks) {
  let state = new Array(14190).fill(0); // compute state, technically nPairs
  for(let i=0;i<tiks.length;i++) { 
    let tik = tiks[i].sort((a,b)=>a-b); //a-b is forward sort
    if(tik.length!==K) {
      continue;
    }

    let threePee = [[0,1,2],[0,1,3],[0,1,4],[0,1,5],[0,2,3],[0,2,4],[0,2,5],[0,3,4],[0,3,5],[0,4,5],[1,2,3],[1,2,4],[1,2,5],[1,3,4],[1,3,5],[1,4,5],[2,3,4],[2,3,5],[2,4,5],[3,4,5]];
    let ithTriplet = threePee.map( x => { 
      let pairCombo = [tik[x[0]], tik[x[1]], tik[x[2]]];
      return inverseIthCombination(N, pairCombo)
    });

    for(let i=0;i<ithTriplet.length;i++) { //length should always be 6c3 = 20
      state[ithTriplet[i]]++;
    }
  }
  return state.filter(Boolean).length; //count
}

console.log('Coverage',coverage(tiks),'/',maxPossible,'/',choose(N,P));



























function choose( n, k ) { // n & k are part of the mathematical choose() function
  let ret = 1;
  if( k===0 || k===n ) {
    return 1;
  } else if( k===1 ) {
    return n;
  } else if( k<0 || k>n) {
    return 0;
  } else if( k > n/2 ) {
    k = n - k;
  }
  for(let i=1;i<=k;i++){
    ret *= ( n - k + i ) / i;
  }
  return Math.round( ret );
}

function randInt( n ) {
  return Math.floor( Math.random() * n );
}

function hasDuplicates ( array ) {
  return ( new Set( array) ).size !== array.length;
}

function sequence( n ) {
  return Array.from( {length: n}, (x, y) => y );
}

function ithCombination( n, k, i ) { // i is ith iteration 0 <= i < nCk
  let arr;
  if( n.constructor === Array ) {
    arr = n;
  } else {
    let limit = choose(n,k);
    if(i >= limit) {
      throw `i must be below nCk (${limit})!`;
    }
    arr = sequence(n);
  }
  if( k === 0 ) {
    return [];
  } else if( arr.length === k ) {
    return arr;
  } else {
    let remainingSlots = choose(arr.length-1, k-1);
    if( i < remainingSlots ) {
      return [arr[0]].concat( ithCombination(arr.slice(1), k-1, i) );
    } 
    return ithCombination(arr.slice(1), k, i-remainingSlots);
  }
}

function inverseIthCombination( n, combinationArray ) { // returns a 0-indexed iteration 0<=i<n array
  let k = combinationArray.length;
  let position = Array.from(combinationArray, x => sequence(n).indexOf(x));
  if( position.includes(-1)) {
    throw `Error: combinationArray must contain elements in range 0 <= x < ${n}.`;
  }
  if( hasDuplicates(position)) {
    throw 'Error: combinationArray is a combination and should not contain duplicates.'
  }
  position.sort((a,b)=>a-b);
  let ret = 0;

  for(let i=0;i<position.length;i++) {
    let last = i===0 ? 0 : position[i-1]+1;
    add = choose(n-last, k-i) - choose(n-position[i], k-i);
    ret += add;
  }
  return ret;
}