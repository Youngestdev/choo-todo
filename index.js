var css = require('sheetify')
var choo = require('choo')

css('./assets/style')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/notes'))

app.route('/', require('./views/main'))
app.route('/login', require('./views/login'))
app.route('/register', require('./views/register'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
