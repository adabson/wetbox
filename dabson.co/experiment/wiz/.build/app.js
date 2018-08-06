//yes, i want this global
wet = require( '../../../../../npm-wetbox' ); // @todo: replace this with legit wetbox installation

document.title = 'wiz';

console.log( 'Using version:', wet.getVersion() );
wet.keyListen( 
  () => { return true },
  () => { console.log( 'up' ) }, 
  () => { console.log( 'down' ) }, 
  () => { console.log( 'left' ) }, 
  () => { console.log( 'right' ) }, 
  () => { console.log( 'space' ) }, 
  () => { console.log( 'ctrl' ) } 
);

//console.log(d)

let canvasEl = document.createElement('canvas');
canvasEl.setAttribute('id', 'canvas');
document.body.appendChild( canvasEl );

console.log(wet);

let x='xxxxx';