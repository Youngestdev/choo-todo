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
    // Using Localstorage
    localStorage.getItem('notes') === null ? localStorage.setItem('notes', JSON.stringify(state.notes.notes)) : 
    // Let state.notes.notes be equal to the data from localstorage!
    state.notes.notes = JSON.parse(localStorage.getItem('notes'))
    // Register ..
    emitter.on('notes:auth.register', (details) => {
      localStorage.setItem('user', JSON.stringify(details))
      emitter.emit('pushState', '/login')
    })
// Login ..
    emitter.on('notes:auth.login', (x) => {
      // Believe me sincerely, this below is patch patch lol.
      // Add Authentication support - Let's use LocalStorage.. Never use it in real apps oh!

     let user = JSON.parse(localStorage.getItem('user'))
    //  If only I could use ternary here, haq haq haq

     if (x.username === user.username && x.password === user.password ) {
       state.notes.authenticated = !state.notes.authenticated
       state.users = x
       emitter.emit('pushState', '/')
     } else {
       alert('Wrong username and/or password')
       emitter.emit('pushState', '/')
     }
      emitter.emit('render')
    })

    emitter.on('notes:add', (note) => {
      state.notes.notes.push({text: note})
      localStorage.setItem('notes', JSON.stringify(state.notes.notes))
    })
    emitter.emit('render')
  })
}