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
//X = M * basePool.length; //total no tickets
//bought in batches of 7, LCM is 105 (M=7)
//355 evergreen tiks needed for >50% coverage (105 * 4 = 420 )

/*
	105
	210
	315
	420 ----> M=28
	525
	630
	735 (M=49)
	840 ----> LCM(15,20,7), M=56
*/


let blankSlate = [];
for(let i=0;i<M;i++) { 
  blankSlate = blankSlate.concat(JSON.parse(JSON.stringify(basePool)));
}
tiks = JSON.parse(JSON.stringify(blankSlate)); //deep copy initialize
X = tiks.length;
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

ITER = 12001;
ITER_LOG_EVERY=100;
ITER_RESET_EVERY=4000;
let bestTiks = JSON.parse(JSON.stringify(tiks)); //JSON.parse(JSON.stringify(blankSlate))
let bestCoverage = coverage(tiks);



// MANUAL INIT
tiks = [[2,4,14,17,37,41],[7,11,16,23,33,36],[7,14,16,19,25,29],[11,20,23,24,26,40],[0,18,25,26,29,40],[2,5,16,26,29,32],[20,33,39,40,41,43],[2,14,24,28,39,43],[0,5,14,15,18,23],[3,8,10,14,18,21],[4,11,17,32,33,40],[0,5,8,11,21,38],[3,5,24,27,36,39],[3,28,30,33,34,38],[5,9,12,22,27,28],[5,10,15,30,35,44],[2,22,30,38,40,41],[9,10,15,25,34,42],[8,9,16,22,23,35],[8,20,23,27,36,42],[14,16,32,33,35,37],[4,12,18,38,43,44],[11,18,39,41,42,44],[2,6,7,20,23,38],[11,13,17,26,28,42],[14,25,28,32,40,41],[19,22,23,30,32,44],[3,11,14,34,35,44],[2,7,8,25,34,35],[6,8,9,14,19,34],[16,23,32,34,38,43],[6,10,22,28,34,41],[5,20,31,32,37,40],[4,10,22,33,35,36],[1,2,6,11,28,31],[0,4,8,24,36,40],[4,5,12,26,34,35],[17,29,30,34,37,42],[4,9,11,27,35,42],[0,12,15,17,21,42],[5,13,20,21,35,39],[11,19,26,29,37,41],[1,25,35,38,41,44],[5,14,19,22,35,42],[0,3,10,13,39,42],[2,3,6,15,18,39],[9,18,19,23,28,29],[6,17,20,27,30,35],[1,4,6,12,13,16],[7,25,27,28,30,37],[8,16,33,34,39,44],[1,17,26,32,37,38],[0,1,14,21,39,41],[7,10,15,20,33,37],[5,12,20,24,38,42],[5,6,9,15,21,26],[1,3,16,17,21,34],[3,9,12,16,31,38],[15,17,18,20,26,44],[23,28,33,42,43,44],[10,11,22,24,25,31],[3,9,11,37,40,43],[10,16,24,34,37,40],[1,5,8,12,19,29],[18,19,24,35,38,40],[8,15,30,31,39,42],[3,7,26,36,38,40],[0,2,4,10,31,34],[1,2,4,26,40,44],[1,7,8,16,20,31],[10,17,19,21,33,39],[1,5,18,26,27,33],[3,21,27,28,35,40],[9,12,14,35,36,43],[7,15,16,22,27,42],[0,4,16,19,30,43],[5,21,23,28,32,33],[7,13,15,21,38,41],[3,17,25,29,31,41],[4,12,24,29,31,39],[8,13,14,30,36,41],[13,18,23,26,35,41],[9,16,20,26,30,39],[7,17,24,30,41,43],[1,10,21,24,29,38],[6,15,19,24,30,37],[0,2,12,26,28,41],[1,13,15,23,29,30],[5,10,20,25,28,36],[0,7,18,27,32,39],[1,14,15,17,24,31],[13,16,21,36,37,42],[7,12,30,31,32,34],[14,23,26,27,39,44],[4,7,8,10,32,41],[9,11,14,16,17,18],[6,19,28,36,40,42],[0,6,19,21,29,31],[2,19,35,36,39,44],[6,8,11,12,32,42],[4,27,29,30,36,44],[20,22,23,25,29,34],[2,11,12,18,27,34],[4,23,25,36,37,38],[2,10,12,19,32,38],[1,9,22,29,36,41],[3,7,9,13,19,27],[5,7,13,18,37,43],[21,22,26,41,43,44],[1,10,12,20,22,30],[8,9,13,29,31,40],[6,11,13,27,33,39],[6,10,16,20,21,44],[4,13,14,28,29,34],[5,21,25,27,31,34],[0,13,22,31,32,35],[3,26,31,33,37,44],[10,13,17,31,38,44],[3,12,19,22,34,39],[3,12,15,25,27,43],[4,9,21,25,33,43],[1,17,18,19,42,43],[3,15,23,31,32,36],[2,11,14,20,21,22],[8,11,17,24,29,35],[6,11,18,20,25,43],[5,8,25,32,39,43],[13,25,26,34,37,39],[0,6,18,36,37,41],[2,3,12,13,24,37],[2,11,13,15,25,40],[2,15,21,23,24,44],[0,3,15,22,33,41],[0,14,27,37,38,40],[10,16,31,35,42,43],[4,20,24,25,30,32],[16,18,20,24,29,36],[4,15,19,22,26,28],[1,7,12,23,37,40],[0,8,17,19,27,28],[1,13,22,33,38,42],[2,9,27,33,36,40],[2,6,10,30,33,43],[0,3,9,17,30,44],[0,7,14,31,33,43],[4,6,9,17,23,24],[7,9,28,32,38,42],[1,8,18,28,32,36],[0,1,5,6,24,43],[6,7,8,22,29,44]]


for(let i=0;i<ITER;i++) {
  //swap 2 random pairs and assess the coverage
	//console.log('iter'+i+' @'+reportCoverage());

	if(ITER_LOG_EVERY && i%ITER_LOG_EVERY===0) {
		console.log('iter'+i,'current',coverage(tiks));
	}

	let isEvergreen = coverage(tiks) === maxPossible;
	if(i!==0 && i%ITER_RESET_EVERY===0 || isEvergreen) {
	  if(coverage(tiks) >= bestCoverage) {
	    bestCoverage = coverage(tiks);
	    bestTiks = JSON.parse(JSON.stringify(tiks));
	    console.log('new best!------------------',bestCoverage,'/',maxPossible);
	    let localCover = (bestCoverage / maxPossible * 100 ).toFixed(2);
	    let pcCover = (bestCoverage / choose(N, P) * 100 ).toFixed(2);
	    console.log('\n'+bestCoverage+' best /',maxPossible,'/',choose(N,P),'= '+localCover+'% ('+tiks.length+' tickets), total: '+pcCover+'%');
	    console.log("  "+JSON.stringify(bestTiks)+"\n");
	  } else { console.log('iter',i); }
	  tiks = JSON.parse(JSON.stringify(blankSlate)); //reset
	}

  let t = randomTwoTargets();
  let safeA = !tiks[t[0][0]].includes(tiks[t[1][0]][t[1][1]]);
  let safeB = !tiks[t[1][0]].includes(tiks[t[0][0]][t[0][1]]);
  if(safeA && safeB) {
    // console.log('ok to swap');
    let preCoverage = coverage(tiks);
    let preState = JSON.stringify(tiks);

    let swapA = parseInt(tiks[t[0][0]][t[0][1]]);
    let swapB = parseInt(tiks[t[1][0]][t[1][1]]);

    tiks[t[0][0]][t[0][1]] = swapB;
    tiks[t[1][0]][t[1][1]] = swapA;
    let postCoverage = coverage(tiks);

    if( preCoverage > postCoverage ) { //revert
      tiks = JSON.parse(preState);
      let postRevertCoverage = coverage(tiks);
      if(preCoverage!==postRevertCoverage) {
        console.log('BROKEN REVERSION: is',preCoverage,'=',postRevertCoverage,'?');
        console.log(preState==JSON.stringify(tiks));
      }
    }
  }
}







function randomTwoTargets() {
  let i = Math.floor(Math.random() * X);
  let k = i;
  while(k===i) {
    k = Math.floor(Math.random() * X);
  }

  let j = Math.floor(Math.random() * K);
  let l = Math.floor(Math.random() * K);

  return [[i,j],[k,l]];
}




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