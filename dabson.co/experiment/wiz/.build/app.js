try {
  WET = require( '../../../../../npm-wetbox' )
} catch( e ) {
  WET = require( 'wetbox' )
}
THREE = require( 'three' )
let game = new WET.Game( THREE )

document.title = 'Wizzy boi'