var Component = require('choo/component')
var html = require('choo/html')

class Test extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state
    this.emit = emit
    this.local = state.components[id] = {}
    this.authenticated = state.notes.authenticated
    this.users = state.users
  }

  createElement () {

    return html`
      <header class="header">
        <h3>
          Notes App
        </h3>
        <nav>
        ${!this.authenticated ? html` 
          <button onclick=${this.onclick}>
            Login
          </button>`
          : html`
            Username: ${this.users.username}
          `
      }
        </nav>
      </header>
    `
  }

  update () {
    return true
  }

  onclick () {
    window.location.href = window.location+'login'
  }
}

module.exports = Test