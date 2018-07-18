var express = require('express');
var mainer = express.Router();
var fs = require('fs'); //파일시스템 기본모듈
const multer = require('multer');

//multer 저장소에 대한 설정이 담긴 객체
var stor = multer.diskStorage({
  destination: function (req, file, callback) {
    //적당한 파일 경로
      callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    //적당한 파일 이름
    if(file.originalname == '분류기준')
    {
      callback(null, '분류에 적합한 파일');
    }
    {
      callback(null, file.originalname);
    }

  }
});

var upload = multer({ storage: stor });


mainer.get('/upload', (req, res)=>{
  res.render('main/uploadBoard');
});

//upload.single();
// -> 파일이 포함되어 있다면 콜백함수에 파일을 매개변수로 포함시키는 미들웨어.
//userfile = 업로드 폼의 name값
mainer.post('/upload', upload.single('userfile'), (req, res)=>{
  //기본기능에서는 파일이름이 랜덤생성되어 추가된다.
  res.send('uploading : ' + req.file.filename);
  console.log(req.file);
});

mainer.get('/writeBoard', (req, res)=>{

  res.render('main/writeBoard');
});

mainer.get(['/', '/boardList', '/boardList/:title'], (req, res)=>{

    //디렉토리 속 파일 리스트 => 리턴 : 배열
    fs.readdir('./data', (err, files)=>{
      if(err)
      {
        console.log(err);
        res.send('/');
        return;
      }
      //타이틀을 클릭해서 링크를 넘어왔는지 체크
      var name = req.params.title;
      if(name){
        //타이틀을 클릭해서 넘어온 경우
         fs.readFile('data/'+name, 'utf8', (err, data)=>{
           if(err)
           {
             console.log(err);
             res.send('/');
             return;
           }
           //객체
           res.render('main/boardList', {
             title: name,
             content: data,
             boardList: files
           });

         });
      }
      else {
        //그냥 게시판 리스트로 넘어온 경우
        res.render('main/boardList', {boardList: files});
      }

    });

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
              res.redirect('/main/boardList/'+title);
              //res.render('main/boardList', {boardList: files});
            }

          });

        }
    });
});




module.exports = mainer;
