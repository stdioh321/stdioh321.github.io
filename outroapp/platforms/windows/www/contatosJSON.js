var connect = require('connect');
var http	= require("http");
var fs		= require("fs");
var app		= connect();

var mysql = require('mysql');

connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'db'
});
var resultDb;
var ok =false;

connection.connect();
var _getContatosDb = function(err, rows, fileds){
	if(err){
				console.log(err);
	}else{
		resultDb = rows;
	}
}

var _getFlag = function(){
	connection.query('SELECT * FROM pessoas', _getContatosDb);
}

var contatos = [
	{nome:"Jao", telefone: "23032111"},
	{nome:"Maria", telefone: "23032111"}
];

var _addContato = function(contato){
	contatos.push(contato);
};

doAnswer = function(request, response){
		
		response.writeHead(200, {'Contenty-Type' : 'text/html', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*'});

		console.log(request.url);
		var rsp = response;
		if(request.url == '/'){
			console.log("Chegou: " + request.url);
			connection.query('SELECT * FROM pessoas', function(err, rows, fiels){
					if(err) console.log(err);
					response.write(JSON.stringify(rows));
					response.end();
			})
			
			// console.log(resultDb);
			// response.write(JSON.stringify(contatos));
			// response.end();

		}else if(request.url == '/add'){
			// _addContato();
			// request.on("data", function(chunk) {
	  //       	var data = chunk;
	  //   		data = JSON.parse(data.toString());
	  //   		// console.log('INSERT INTO pessoas(pessoa_nome, pessoa_telefone) VALUES('+data.nome+','+data.telefone+')');
	  //       	connection.query("INSERT INTO pessoas(pessoa_nome, pessoa_telefone) VALUES('" + data.nome +"','" + data.telefone +"' )", function(err){
	  //       		if(err) console.log(err);
	  //       		else{
	  //       			console.log("Success Add.");
	  //   				response.end();
	  //       		}
	  //       	});
	  //   	});
			response.writeHead(401);
			response.write('Nao Quero....');
			response.end();
		}else if(request.url == '/remove'){
				request.on("data", function(chunk) {
			        	var data = chunk;
			    		data = JSON.parse(data.toString());
			    		// console.log('INSERT INTO pessoas(pessoa_nome, pessoa_telefone) VALUES('+data.nome+','+data.telefone+')');
			        	connection.query("DELETE FROM pessoas WHERE pessoa_id=" + data.pessoa_id, function(err){
			        		if(err) console.log(err);
			        		else{
			        			console.log("Success Remove.");
			    				response.end();
			        		}
	        	});
	    	});
		}

		
}

http.createServer(doAnswer).listen(9090, function(){
	console.log("Server Running...");
});
