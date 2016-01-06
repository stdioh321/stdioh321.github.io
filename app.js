var connect = require('connect');
var http	= require("http");
var fs		= require("fs");
var app		= connect();

doAnswer = function(request, response){

	url = request.url;

	if(url == '/'){
		fs.createReadStream('./index.html').pipe(response);
	}else{

			fs.stat('.'+url, function(err, stat){
				if(err){
					console.log('Dont Exists.');
				}
				if(stat){
					if(stat.isFile()){
						console.log("is FIle: " + url);
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

http.createServer(doAnswer).listen(8888, function(){
	console.log("Server Running...");
});

// http.createServer(app){
// 		// resp.write("<h1>Hello</h1>");
// 		// var f;
// 		// fs.readFile("index.html",{flag: 'r'}, function(err, data){
// 		// 		if(err) throw err;
				
// 		// });
// 		// console.log(resp);
// 		// console.log("URL: " + req.url);
// 		// var url = req.url;
// 		// if(req.url == "/"){
// 		// 		resp.writeHead(200, {"Content-Type" : "text/html"} );
// 		// 		fs.createReadStream("./index.html").pipe(resp);
// 		// }else if(req.url == "/favicon.ico"){

// 		// }
// 		// // if(req.url == "/node_modules/bootstrap/dist/css/bootstrap.css"){
// 		// // 		resp.writeHead(200, {"Content-Type" : "text/css"} );
// 		// // 		fs.createReadStream("./node_modules/bootstrap/dist/css/bootstrap.css").pipe(resp);
// 		// // }
// 		// // resp.end();
// 		// else{
// 		// 	fs.stat("."+url, function(err, stat){
// 		// 		if(err){ throw err};
// 		// 		if(stat.isFile()){
// 		// 				console.log("is File");	
// 		// 				fs.createReadStream("."+url).pipe(resp);
// 		// 		}else if(stat.isDirectory()){
// 		// 				console.log("is Directory");
// 		// 		}
// 		// 	});
// 		// 	// fs.stat(req.url, function(err, stat){
// 		// 	// })
// 		// }

// }).listen(8888, function(){
// 	console.log("Server is Running...");
// });