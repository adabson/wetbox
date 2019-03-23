
for(let i=0;i<choose(45,7);i++) {
  console.log(ithCombination(45,7,i));
}

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
