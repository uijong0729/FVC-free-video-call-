var express = require('express');
var mainer = express.Router();
var fs = require('fs'); //파일시스템 기본모듈

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
    res.render('main/boardList');
});

mainer.get(['/boardList', '/boardList/:title'], (req, res)=>{

  fs.readdir('data', (err, files)=>{
    if(err)
    {
      console.log(err);
      res.status(500).send('죄송합니다. 서버 측 에러입니다.');
    }
    else
    {
      var title = req.params.title;
      //title이 있는가 없는가 체크
      if(!(title))
      {
        res.render('main/boardList', {boardList: files});
      }
      else{
        fs.readFile('data/'+title, 'utf8', (err, data)=>{
          if(err){
            console.log(err);
            res.status(500).send('죄송합니다. 서버 측 에러입니다.');
          }
          else {
            res.render('main/boardList',
            {
              title: title,
              content: data,
              boardList: files
            });
          }
        });
      }

    }//else

  });//readdir
});

mainer.post('/boardList', (req, res)=>{
    var title = req.body.title; //파일이름
    var content = req.body.content; //파일내용
    fs.writeFile(`data/${title}`, content, (error)=>{
        if(error){
          console.log(error);
          res.status(500).send('죄송합니다. 서버 측 에러입니다.');
        }
        else {
          fs.readdir('data', (err, files)=>{
            if(err)
            {
              console.log(err);
              res.status(500).send('죄송합니다. 서버 측 에러입니다.');
            }
            else
            {
              res.render('main/boardList', {boardList: files});
            }

          });

        }
    });
});




module.exports = mainer;
