//cross-pollen mutations
let basePool = [
  [1,2,3,4,5,6,7],
  [8,9,10,11,12,13,14],
  [15,16,17,18,19,20,21],
  [22,23,24,25,26,27,28],
  [29,30,31,32,33,34,35]
];


N = 20;
K = 7;
X = 35 //#no. tickets. please make it a factor of five for balanced number spreading.
ITER = 1000000000; //1B
ITER_RESET_EVERY = 1000000; //1M
ITER_LOG_EVERY = 100000; //100K


let blankSlate = [];
for(let i=0;i<Math.floor(X/5);i++) {
  blankSlate = blankSlate.concat(JSON.parse(JSON.stringify(basePool)));
}

tiks = JSON.parse(JSON.stringify(blankSlate));

console.log(tiks);


function coverage() {
  let state = [
    [0],
    [0,0],
    [0,0,0],
    [0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  for(let i=0;i<tiks.length;i++) {
    let tik = tiks[i];
    tik.sort((a,b)=>b-a); //reverse

    state[tik[0]][tik[1]] = 1;
    state[tik[0]][tik[2]] = 1;
    state[tik[0]][tik[3]] = 1;
    state[tik[0]][tik[4]] = 1;
    state[tik[0]][tik[5]] = 1;
    state[tik[0]][tik[6]] = 1;

    state[tik[1]][tik[2]] = 1;
    state[tik[1]][tik[3]] = 1;
    state[tik[1]][tik[4]] = 1;
    state[tik[1]][tik[5]] = 1;
    state[tik[1]][tik[6]] = 1;

    state[tik[2]][tik[3]] = 1;
    state[tik[2]][tik[4]] = 1;
    state[tik[2]][tik[5]] = 1;
    state[tik[2]][tik[6]] = 1;

    state[tik[3]][tik[4]] = 1;
    state[tik[3]][tik[5]] = 1;
    state[tik[3]][tik[6]] = 1;

    state[tik[4]][tik[5]] = 1;
    state[tik[4]][tik[6]] = 1;

    state[tik[5]][tik[6]] = 1;
  }

  let count = 0;
  for(let i=0;i<state.length;i++) {
    let row = state[i];
    for(let j=0;j<row.length;j++) {
      count += row[j];
    }
  }
  return count;
}

function choose(n, k) {
  let ret = 1;
  for(let i=1;i<=k;i++){
    ret*=(n-k+i)/i;
  }
  return ret;
}

function reportCoverage() {
  let coverN = coverage();
  let pcCover = (coverN / choose(N,2) * 100 ).toFixed(2);
  return 'n'+tiks.length+'=',coverN+'/'+choose(N,2),'=',pcCover+'%';
}

console.log(reportCoverage()); // i % 100

let bestTiks = JSON.parse(JSON.stringify(tiks)); //JSON.parse(JSON.stringify(blankSlate))
let bestCoverage = coverage();

for(let i=0;i<ITER;i++) {
  //swap 2 random pairs and assess the coverage
  if(i%ITER_LOG_EVERY===0) {
    //console.log('iter'+i+' @'+reportCoverage());
    if(i%ITER_RESET_EVERY===0) {
      if(coverage() >= bestCoverage) {
        bestCoverage = coverage();
        bestTiks = JSON.parse(JSON.stringify(tiks));
        console.log('new best!--------------------------------------');
        let pcCover = (bestCoverage / choose(N,2) * 100 ).toFixed(2);
        console.log('best: (',bestCoverage,' = '+pcCover+'%)',JSON.stringify(bestTiks));
      } else { console.log('iter',i); }
      tiks = JSON.parse(JSON.stringify(blankSlate)); //reset
    }
  }

  let t = randomTargets();
  let safeA = !tiks[t[0][0]].includes(tiks[t[1][0]][t[1][1]]);
  let safeB = !tiks[t[1][0]].includes(tiks[t[0][0]][t[0][1]]);
  if(safeA && safeB) {
    // console.log('ok to swap');
    let preCoverage = coverage();
    let preState = JSON.stringify(tiks);

    let swapA = parseInt(tiks[t[0][0]][t[0][1]]);
    let swapB = parseInt(tiks[t[1][0]][t[1][1]]);

    tiks[t[0][0]][t[0][1]] = swapB;
    tiks[t[1][0]][t[1][1]] = swapA;
    let postCoverage = coverage();

    if( preCoverage > postCoverage ) { //revert
      tiks = JSON.parse(preState);
      let postRevertCoverage = coverage();
      if(preCoverage!==postRevertCoverage) {
        console.log('BROKEN REVERSION: is',preCoverage,'=',postRevertCoverage,'?');
        console.log(preState==JSON.stringify(tiks));
      }
    }
  }
}
console.log('coverage',coverage(),'/',choose(N,2));
console.log(reportCoverage());
console.log(JSON.stringify(tiks));

function randomTargets() {
  //returns 2 index pairs: [[i][j], [k][l]], where i!=k and 0<=i<X, 0<=k<X, 0<=j<K, 0<=l<K
  //Math.floor(Math.random() * 6) + 1  (random number between 0 and n)

  let i = Math.floor(Math.random() * X);
  let k = i;
  while(k===i) {
    k = Math.floor(Math.random() * X);
  }

  let j = Math.floor(Math.random() * K);
  let l = Math.floor(Math.random() * K);

  return [[i,j],[k,l]];
}