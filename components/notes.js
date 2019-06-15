var Component = require('choo/component')
var html = require('choo/html')

function Note(note) {
  return html`
  <ul>
    <li>${note.text}</li>
  </ul>
  `
}

class Notes extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state
    this.emit = emit
    this.local = state.components[id] = {}
    this.notes = this.state.notes.notes
  }

  createElement () {
    return html`
      <div class="notes">
        <h3> Notes </h3>
        ${this.notes.map(notes => Note(notes))}
        <input
          autofocus
          placeholder="Add a new short note..."
          onkeydown=${this.addNote.bind(this)}
          />
      </div>
    `
  }

  update () {
    return true
  }

  addNote (e) {
    var note = e.target.value
    // Can't I use ternary here...? 
    if (e.keyCode === 13) {
      e.target.value = ''
      this.emit('notes:add', note)
      this.emit('render')
    }
  }
}

module.exports = Notes