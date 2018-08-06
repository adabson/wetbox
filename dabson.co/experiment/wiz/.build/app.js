try {
  WET = require( '../../../../../npm-wetbox' )
} catch( e ) {
  WET = require( 'wetbox' )
}
THREE = require( 'three' )
game = new WET.Game( THREE, 'Wizzy boi' )