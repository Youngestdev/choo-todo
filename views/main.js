var html = require('choo/html')

var Header = require('../components/header')
var Notes = require('../components/notes')

var TITLE = "Notes and Quick To-dos!"

module.exports = view

function view (state, emit) {
  // Basically, everything is hardcoded.
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body>
      <section class="notes">
        ${state.cache(Header, 'header').render()}  
        ${state.notes.authenticated === true ? state.cache(Notes, 'notes').render() : html`<br/> <p>Heyo!, Login to view and add notes</p>` }
      </section>
    </body>
  `
}