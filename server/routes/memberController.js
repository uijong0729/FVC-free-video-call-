var express = require('express');
var member = express.Router();


member.get('/login', function(req, res){
  res.send('로그인');
});

member.get('/mypage', (req, res)=>{
  res.send('마이페이지');
});

member.get('/register', (req, res)=>{
  res.send('회원가입');

});


module.exports = member;
