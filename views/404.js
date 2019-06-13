var html = require('choo/html')

var TITLE = 'Route not found'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body class="sans-serif pa3">
      <h1>Route not found.</h1>
      <p>
        Can't find what you're looking for? Use the link below!
      </p>
      <a class="pt2" href="/">Back to main.</a>
    </body>
  `
}
