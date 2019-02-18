 //zero-indexed
let basePool = [
  [ 0,  1,  2,  3,  4,  5], 
  [ 6,  7,  8,  9, 10, 11], 
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23], 
  [24, 25, 26, 27, 28, 29], 
  [30, 31, 32, 33, 34, 35], 
  [36, 37, 38, 39, 40, 41], 
  [42, 43, 44,  0,  1,  2], 
  [ 3,  4,  5,  6,  7,  8], 
  [ 9, 10, 11, 12, 13, 14], 
  [15, 16, 17, 18, 19, 20], 
  [21, 22, 23, 24, 25, 26], 
  [27, 28, 29, 30, 31, 32], 
  [33, 34, 35, 36, 37, 38],
  [39, 40, 41, 42, 43, 44]
];

N = 45;
K = 6;
P = 3;
M = 10; 

NcK = 8145060;
NcP = 14190;

const threePee = [[0,1,2],[0,1,3],[0,1,4],[0,1,5],[0,2,3],[0,2,4],[0,2,5],[0,3,4],[0,3,5],[0,4,5],[1,2,3],[1,2,4],[1,2,5],[1,3,4],[1,3,5],[1,4,5],[2,3,4],[2,3,5],[2,4,5],[3,4,5]];
let tiks = [];
let state = zeros(NcP)

let tik0 = ithCombination(N,K,824893);
let tik0_20_3_pairs = [];
threePee.forEach(x => {
  let threePair = [tik0[x[0]], tik0[x[1]], tik0[x[2]]];
  tik0_20_3_pairs.push(inverseIthCombination(N,threePair));
});

console.log( 'Hi my name is slim shadey - randomize init 14190 array?' );
console.log( tik0 );
console.log( inverseIthCombination( N, tik0 ) );
//console.log( tiks );
//console.log( state.join('') );
//console.log( tik0_20_3_pairs.join(' ') );

for(let i=0;i<NcK;i++) { // < NcK
  let tikn = ithCombination(N,K,i);
  let tikn_20_3_pairs = [];

  if(i%10000===0)console.log('i',i);

  for(let j=0;j<20;j++) {
    let x = threePee[j];
    let threePair = [tikn[x[0]], tikn[x[1]], tikn[x[2]]];
    let pairI = inverseIthCombination(N,threePair); //the 0-14190 pairing

    if(state[pairI]!=0) {
      break;
    }

    //if ok, keep going, else halt and ignore
    tikn_20_3_pairs.push(pairI);

  }

  if(tikn_20_3_pairs.length===20) { //we made it the whole way without experiencing a clash)
    //add to tiks (tik selection)
    //update state

    tiks.push(tikn);
    tikn_20_3_pairs.forEach(y => {
      state[y] = 1;
    });

    console.log('Evergreen: ',tiks.length)
    //log it?
  }

  // threePee.forEach(x => {
  //   let threePair = [tikn[x[0]], tikn[x[1]], tikn[x[2]]];
  //   let pairI = inverseIthCombination(N,threePair); //the 0-14190 pairing
  //   tikn_20_3_pairs.push(pairI);
  // });

  // for(let j=0;j<tikn_20_3_pairs.length;j++) {

  // }

}
console.log(JSON.stringify(tiks));

//----------------------------------

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

function zeros( n ) {
  if( typeof n === 'undefined' || n < 1 ) {
    return []
  }
  return new Array( n + 1 ).join( '0' ).split( '' ).map( parseFloat )
}

