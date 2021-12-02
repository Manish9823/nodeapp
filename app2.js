
let http=require("http");

function handler(request,response){
	let str= "<html> <head> <title> Leadows Technologies </title> </head> <body bgcolor='cyan'> <h2> ";
	
	let n= 7;

	str+=" Number Table of " + n + " <br><br> ";
	
	for(let i=1;i<=10;i++){
		let result=i*n;
		str+= n + " x " + i + " = " + result + " <br> ";	
	}
	
	str+="</h2></body></html>";

	response.end(str);

}


let webServer=http.createServer(handler);


// this is called as anonymous function call
// let webServer=http.createServer(function(req,res){
// 	res.end("hello sir")
// });

webServer.listen(9001);