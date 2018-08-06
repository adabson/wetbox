try {
  window.WET = require( '../../../../../npm-wetbox' ) // @todo: replace this with legit wetbox installation
} catch( e ) {
  window.WET = require( 'wetbox' )
}
window.THREE = require( 'three' )
window.game = new WET.Game( THREE )

document.title = 'Wizzy boi'
