var connect = require('connect');
var http	= require("http");
var fs		= require("fs");
var app		= connect();

doAnswer = function(request, response){
	
	var url = request.url;
	
	if(url == '/'){
		fs.createReadStream('./index.html').pipe(response);
	}else{

			fs.stat('.'+url, function(err, stat){
				if(err){
					console.log('URL: ' + url +' - Dont Exists');
					response.writeHead(404);
					response.end();
				}
				if(stat){
					if(stat.isFile()){
						console.log('URL --> ' + url);
						console.log('HEADER:ACCEPT --> ' + request.headers.accept);
						console.log("\n");

						response.writeHead(200);
						fs.createReadStream('.'+url).pipe(response);
	
					}else if(stat.isDirectory()){
						console.log("is Directory: " + url);

					}else{
						
						console.log("I dont know.");
					}
				}
			});
	}

}

app.use(doAnswer);
http.createServer(doAnswer).listen(8888, function(){
	console.log("Server Running...");
});