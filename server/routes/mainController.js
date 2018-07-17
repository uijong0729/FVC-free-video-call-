var express = require('express');
var mainer = express.Router();

mainer.get('/login', function(req, res){
  res.send('로그인');
});

mainer.get('/mypage', (req, res)=>{
  res.send('마이페이지');
});

mainer.get('/register', (req, res)=>{
  res.send('회원가입');

});

mainer.get('/', (req, res)=>{
  res.send('메인화면');

});

module.exports = mainer;
