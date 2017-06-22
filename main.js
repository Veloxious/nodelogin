const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

var loginPass =  ''
var loginUsr = ''
var loginTry = false
var secret = {
  username: 'veloxious',
  password: 'yrumtu8b4'
}

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))

app.use(session({
  secret: 'S3CRE7',
  resave: false,
  saveUninitialized: true
}))

app.get('/', function(req, res){
  if (req.session.usrName === secret.username && req.session.usrPass === secret.password ) {
    res.render('index', {loginTry: loginTry, loginUsr: loginUsr})
  } else {
    res.redirect('/login')
  }
})

app.get('/login', function(req, res){
  res.render('index')
})

app.post('/login', function(req, res){
  loginUsr = req.body.usrName
  loginPass = req.body.usrPass
  if (loginUsr === secret.username && loginPass === secret.password){
    req.session.usrName = loginUsr
    req.session.usrPass = loginPass
    loginTry = true
    res.redirect('/')
  } else {
    res.redirect('/login')
  }
})

app.listen(3000, function(){
  console.log('runnin');
})
