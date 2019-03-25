const am = process.argv[2] * 1000000 || 0;
const bm = process.argv[3] * 1000000 || choose(45,7);

for(let i=am;i<bm;i++) { //choose(45,7)
  let x = ithCombination(45,7,i);
  console.log((x[0]+1).toString().padStart(2)+(x[1]+1).toString().padStart(3)+(x[2]+1).toString().padStart(3)+(x[3]+1).toString().padStart(3)+(x[4]+1).toString().padStart(3)+(x[5]+1).toString().padStart(3)+(x[6]+1).toString().padStart(3));
}

// to aggregate: (for .. type too slow, use copy)
// for %f in (*m.txt) do type "%f" > aggregate.txt
// copy 01m.txt+02m.txt+03m.txt+04m.txt+05m.txt+06m.txt+07m.txt+08m.txt+09m.txt+10m.txt+11m.txt+12m.txt+13m.txt+14m.txt+15m.txt+16m.txt+17m.txt+18m.txt+19m.txt+20m.txt+21m.txt+22m.txt+23m.txt+24m.txt+25m.txt+26m.txt+27m.txt+28m.txt+29m.txt+30m.txt+31m.txt+32m.txt+33m.txt+34m.txt+35m.txt+36m.txt+37m.txt+38m.txt+39m.txt+40m.txt+41m.txt+42m.txt+43m.txt+44m.txt+45m.txt master.txt

// ----------------------------------
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
    throw `Error: combinationArray must contain elements (${combinationArray}) in range 0 <= x < ${n}.`;
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

function sequence( n ) {
  return Array.from( {length: n}, (x, y) => y );
}

function randomizeArray( array ) {
  let currentIndex = array.length, temporaryValue, randomIndex
  while ( 0 !== currentIndex ) {
    randomIndex = Math.floor( Math.random() * currentIndex )
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
