const express = require('express');
const bodyParser = require('body-parser');
const mainer = require('./server/routes/mainController.js'); //라우터
const app = express();
//const dbcon = require('./dbinit.js');
//const dbcon = require('./dbmongooseinit.js');


//pug세팅
app.set('views', './views'); // ./인경우 현재경로
app.set('view engine', 'pug');
app.locals.pretty = true;

//static파일
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('user', express.static('uploads'));

//부트스트랩 제이쿼리
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap



app.use('/main', mainer); //라우터
app.use(bodyParser.urlencoded({ extended: false }));  //post

app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(1337, ()=>{
  console.log('connected 1337 port');
});
