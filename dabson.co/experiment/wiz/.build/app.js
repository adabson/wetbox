let WET = window.WET
try {
  WET = window.WET = require( '../../../../../npm-wetbox' ) // @todo: replace this with legit wetbox installation
} catch( e ) {
  WET = window.WET = require( 'wetbox' )
}
let THREE = window.THREE = require( 'three' )
let game = window.game = new WET.Game( THREE )

document.title = 'Wizzy boi'
