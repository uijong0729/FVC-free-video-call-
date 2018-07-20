const express = require('express');
const bodyParser = require('body-parser');
const mainer = require('./server/routes/mainController.js'); //라우터
const app = express();
const dbcon = require('./dbinit.js');



//pug세팅
app.set('views', './views'); // ./인경우 현재경로
app.set('view engine', 'pug');
app.locals.pretty = true;

//static파일
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('user', express.static('uploads'));

app.use('/main', mainer); //라우터
app.use(bodyParser.urlencoded({ extended: false }));  //post

app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(1337, ()=>{
  console.log('connected 1337 port');
});
