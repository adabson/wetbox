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
tiks = [[2,4,14,17,28,37],[7,8,11,29,33,38],[7,16,19,24,25,29],[11,20,23,24,26,40],[0,18,25,26,29,44],[2,14,22,26,29,32],[11,15,19,20,33,39],[2,7,16,28,39,43],[0,5,14,15,23,37],[3,10,14,21,26,30],[3,17,32,33,43,44],[0,2,5,11,30,38],[3,5,24,27,29,30],[3,28,30,33,34,36],[9,12,22,27,28,43],[5,8,10,15,31,44],[2,13,22,30,41,42],[9,10,12,15,30,34],[8,9,22,23,35,40],[2,8,20,23,27,42],[14,16,32,33,35,37],[4,12,18,38,40,43],[11,18,39,41,42,44],[4,6,7,13,19,23],[11,13,17,26,28,42],[6,10,14,32,40,43],[10,17,21,22,23,32],[0,11,14,34,40,44],[2,8,25,34,35,37],[6,9,14,17,19,34],[16,18,23,25,32,38],[6,10,22,28,34,41],[3,15,21,32,35,42],[4,16,21,22,33,36],[6,11,19,28,31,32],[14,22,24,36,42,44],[5,14,26,34,35,38],[1,11,14,29,30,42],[4,9,11,27,35,42],[0,4,12,17,25,42],[19,21,29,32,38,39],[13,19,26,29,37,41],[13,15,37,38,41,44],[0,5,35,36,40,42],[0,3,10,13,39,42],[2,3,6,15,18,38],[9,18,19,23,28,29],[2,6,16,17,30,40],[1,4,6,12,20,32],[7,25,27,28,36,37],[1,15,16,34,39,44],[1,17,26,32,37,38],[0,1,14,21,39,41],[4,7,8,18,24,41],[5,13,20,24,38,42],[6,7,9,15,24,26],[1,3,13,20,21,34],[3,5,9,12,33,38],[15,17,18,20,36,44],[23,25,28,42,43,44],[10,18,20,22,24,33],[1,9,11,15,37,40],[10,16,24,34,37,40],[1,5,8,12,19,35],[18,24,28,31,35,38],[8,30,31,35,39,42],[3,7,26,36,38,40],[4,7,9,10,28,31],[1,2,4,26,40,44],[0,1,7,10,16,26],[10,12,17,33,39,40],[1,5,20,26,27,33],[3,16,23,27,28,35],[3,9,14,35,36,43],[7,15,16,22,27,42],[0,4,16,19,30,34],[5,6,8,21,23,33],[7,12,13,21,28,41],[3,17,20,25,31,42],[4,12,24,29,31,39],[8,11,13,14,23,36],[12,18,23,26,35,41],[9,13,18,26,39,43],[7,11,20,30,31,41],[1,10,21,24,28,29],[15,18,19,24,30,37],[0,2,12,19,20,41],[1,13,15,25,27,29],[10,13,19,25,28,33],[0,7,18,27,32,39],[1,14,15,17,24,31],[8,16,21,37,38,42],[7,12,17,32,34,36],[14,19,23,26,39,44],[0,4,5,10,32,41],[5,8,9,11,16,20],[6,8,28,36,39,40],[0,2,6,21,27,35],[1,2,23,35,36,39],[6,8,10,11,12,42],[4,27,30,36,39,44],[20,22,23,25,29,34],[2,12,27,30,31,34],[4,31,34,36,38,41],[2,7,10,12,32,38],[1,9,22,29,36,41],[3,7,9,19,20,27],[5,7,13,16,18,37],[21,22,26,31,41,44],[5,10,12,16,25,44],[5,13,29,31,34,40],[6,11,13,27,37,39],[6,16,18,19,21,44],[4,14,20,29,33,41],[4,5,21,25,27,31],[0,1,17,22,35,43],[3,4,8,26,33,37],[10,13,17,30,31,38],[3,12,19,22,34,39],[3,6,12,25,30,43],[9,25,33,34,41,43],[17,18,19,36,42,43],[15,23,31,32,36,40],[2,4,11,20,21,22],[8,11,17,24,29,35],[5,18,20,25,35,43],[8,23,32,37,39,41],[10,25,26,34,36,39],[6,18,31,33,37,41],[2,3,12,13,24,37],[0,11,15,16,25,35],[2,15,21,23,24,44],[3,15,22,29,33,40],[0,22,27,37,38,40],[16,21,29,31,35,43],[9,20,25,30,32,44],[16,20,24,30,36,43],[4,5,15,22,26,28],[7,19,21,33,40,43],[0,17,19,27,31,44],[1,13,14,33,38,40],[2,9,27,34,36,40],[1,2,21,33,37,43],[0,3,8,9,17,30],[0,7,14,25,31,43],[6,17,23,24,27,41],[9,14,28,32,38,42],[1,8,13,28,30,32],[5,6,11,24,43,44],[6,8,18,22,29,43]];




for(let i=0;i<ITER;i++) {
  //swap 2 random pairs and assess the coverage
	//console.log('iter'+i+' @'+reportCoverage());

	if(ITER_LOG_EVERY && i%ITER_LOG_EVERY===0) {
		console.log('iter'+i,'current',coverage(tiks));
	}

	if(i!==0 && i%ITER_RESET_EVERY===0) {
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