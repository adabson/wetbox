let x = zeroOneTwoThreeFourFiveSixSevenEight = [[0,1,2,3,4,5,6],[0,7,8,9,10,11,12],[0,13,14,15,16,17,18],[0,19,20,21,22,23,24],[0,25,26,27,28,29,30],[1,7,13,19,25,31,32],[1,8,14,20,26,33,34],[2,9,15,21,27,31,33],[2,10,16,22,28,32,34],[3,11,17,23,29,31,34],[3,12,18,24,30,32,33],[4,5,7,8,15,22,29],[4,5,9,10,13,20,30],[4,5,11,12,14,19,27],[6,7,8,16,17,21,30],[6,9,10,14,18,23,25],[6,11,13,15,24,26,28],[4,5,16,17,24,25,33],[4,5,18,21,26,28,31],[1,9,12,16,17,22,26],[2,3,7,8,13,23,27],[2,6,12,18,19,20,29],[1,3,10,14,21,24,29],[1,3,15,19,23,28,30],[2,11,14,22,25,30,31],[12,13,15,20,21,25,34],[1,11,16,17,20,27,32],[6,7,18,22,24,27,34]]


function convertZeroToOneIndex(twoDeeArray) {
  for(let i=0;i<twoDeeArray.length;i++) {
    let tik=twoDeeArray[i];
    let newTik=[];
    for(let j=0;j<tik.length;j++) {
      newTik.push(tik[j]+1);
    }
    twoDeeArray[i] = newTik;
  }
}

convertZeroToOneIndex(x);
console.log(JSON.stringify(x));