var html = require('choo/html')

var TITLE = "Notes and Quick To-dos! - Login"

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body>
      <form id="login" onsubmit=${onsubmit}>
        <label for="username">
          username
        </label><br />
        <input id="username" name="username"
          type="text"
          required
          pattern=".{1,36}"
          title="Username must be between 1 and 36 characters long."
        > <br />
        <label for="password">
          password
        </label><br />
        <input id="password" name="password"
          type="password"
          required
        ><br />
        <input type="submit" value="Login">
      </form>
      <p> Don't have no login details yet ?, <a href='/register'> Register then... </a></p>
    </body>
  `

function onsubmit (e) {                                              
  e.preventDefault()
  var form = e.currentTarget
  var data = new FormData(form)                                       
  var headers = new Headers({ 'Content-Type': 'application/json' })   
  var body = {}
  for (var pair of data.entries()) body[pair[0]] = pair[1]                                                    
  fetch(window.location+'/', { method: 'POST', body, headers })            
      .then(res => {
      if (!res.ok) return console.log('oh no!')
      emit('notes:auth.login', body)
    })
    .catch(err => console.log('oh no!', err))
  }
}
