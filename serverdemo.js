var http=require('http');
var fs=require('fs');
function serveStaticFile(response,path,ContentType,responseCode){
	if(!responseCode)
	{
		var responseCode=200;
	}
	if(!ContentType){
		var ContentType='text/plain';
	}
	fs.readFile(__dirname+path,function(err,data){
		if(err){
			response.writeHead(500,{'Content-Type':'text/plain'});
			response.end("Internal server error");
		}
		else{
			response.writeHead(responseCode,{'Content-Type':ContentType});
			response.end(data);
		}
	});
}
var server=http.createServer(function(request,response){
//	console.log("got a request");
// response.writeHead(200,{'Content-type':'text/plain'});
// 	response.write("hi satyam!!")
// 	response.end();
console.log(request.url);
var path=request.url.replace(/\/?(?:\?.*)?$/,'');

switch(path){
	case '':serveStaticFile(response,'/public/home.html','text/html');
	break;
	case '/about':serveStaticFile(response,'/public/about.html','text/html');
	break;
case '/img/logo.jpg':serveStaticFile(response,'/public/img/logo.jpg','image/jpeg');
break;
default:serveStaticFile(response,'/public/notFound.html','text/html',404);
}
});
server.listen(3000);
console.log("server is running at localhost:3000");
