module.exports = store

store.storeName = 'notes'
function store (state, emitter) {
  state.notes = {
    authenticated: false,
    notes: [
      // Preamble text to set up LocalStorage, phew!!
      {
        text: 'Fix Issues with app'
      }
    ]
  }
  state.users = {}
  emitter.on('DOMContentLoaded', function () {
    localStorage.getItem('notes') === null ? localStorage.setItem('notes', JSON.stringify(state.notes.notes)) : 
    state.notes.notes = JSON.parse(localStorage.getItem('notes'))
    emitter.on('notes:auth', (x) => {
      state.notes.authenticated = !state.notes.authenticated
      state.users = x
      emitter.emit('pushState', '/')
      emitter.emit('render')
    })
    emitter.on('notes:add', (note) => {
      state.notes.notes.push({text: note})
      localStorage.setItem('notes', JSON.stringify(state.notes.notes))
      emitter.emit('render')
    })
    emitter.emit('render')
  })
}