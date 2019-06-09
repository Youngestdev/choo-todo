var html = require('choo/html')

var Header = require('../components/header')
var Notes = require('../components/notes')

module.exports = view

function view (state, emit) {
  // Basically, everything is hardcoded.
  return html`
    <body>
      <section class="notes">
        ${state.cache(Header, 'header').render()}  
        <blockquote>
          Basically, this is a black and white app. Sorry I can't style lol. <br/>
          I'm just playing around with ChooJS. Currently, any login works i.e random username and pass.. <br/>
          That means.. I'LL BE ADDING OTHER FEATURES LATER ON LOL. IT'S A PRIVATE APP.
        </blockquote>      
        ${state.notes.authenticated === true ? state.cache(Notes, 'notes').render() : '' }
      </section>
    </body>
  `
}