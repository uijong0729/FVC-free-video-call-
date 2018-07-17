var express = require('express');
var app = express();

//pug세팅
app.set('views', './views'); // ./인경우 현재경로
app.set('view engine', 'pug');
app.locals.pretty = true;

var mainer = require('./server/routes/mainController.js');
app.use('/main', mainer);

app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(1337, ()=>{
  console.log('connected 1337 port');
});
