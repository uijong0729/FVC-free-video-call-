const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/nodeboard';


MongoClient.connect(url , { useNewUrlParser: true }, function(error, database){
	console.log('MongoDB connected');

	//데이터를 다루는 작업
	var board = database.db().collection('boards');
	board.insert({
		id: 2233,
		title: '인터스텔라',
		content: '크리스토퍼 놀란'
	}, function(error, result){
		console.log(result);

	});

	board.find({title: '인터스텔라'}).toArray(function(err, docs){
		for(var i = 0 ; i < docs.length ; i++)
		{
			var doc = docs[i];
			console.log(doc);
		}
	});

	let objid = require('mongodb').ObjectID;
	board.findOne({_id:new objid('5b56e89954dcd9606cad3174')}, function(err, result){
		console.log(result);
	});

	board.updateOne({_id:new objid('5b56e89954dcd9606cad3174')}, {$set: {title: '스타워즈', content: '우주전쟁스토리'}}, function(error, result){
		console.log(result);
	});

	board.deleteOne({title: '스타워즈'}, function(err, result){
		console.log(result);
	});;

	database.close();
});




/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeboard',  { useNewUrlParser: true }); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});
*/
