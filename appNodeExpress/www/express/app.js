var express = require('express');
var multer 	= require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();


app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index', {
		title: 'Titulo',
		test: {nome: 'Jao', telefone: '23032011'}
	});
});

app.get('/abo*t', function(req, res){
	res.render('about', {
		title: 'Titulo',
		test: {nome: 'Jao', telefone: '23032011'}
	});
});

app.get(/(route|profile)/, function(req, res){
	res.render('about', {
		title: 'profile',
		test: {nome: 'profile', telefone: '23032011'}
	});
});


app.listen(8081, function(){
	console.log('Server is Running...');
});





// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'tmp/')
//   },
//   filename: function (req, file, cb) {
//   	fSplit = file.originalname.split('.');
//     cb(null, file.fieldname + '-' + Date.now() + '.' + fSplit[fSplit.length-1])
//   }
// })
// ;

// var upload = multer({ storage: storage });



// app.use(express.static('public'));

// app.use(bodyParser.urlencoded({extended: false}));	
	


// app.get('/', function(req, res){
// 		res.sendFile(__dirname + '/public/home.html');
// 		// res.end();
// });

// app.get('/dir', function(req, res){
// 		var f = fs.readdirSync('./tmp/');
		
// 		res.send(JSON.stringify(f));
// 		res.end();
// });

// app.post('/process_post', function(req, res){
// 		res.send(JSON.stringify(req.body));
// 		res.end();
// });

// app.post('/process_post_file', upload.any(), function(req, res){
// 		console.log(req.files);
// 		res.end();
// });



// app.listen(8081, function(){
// 	console.log("Server is Running...");
// });