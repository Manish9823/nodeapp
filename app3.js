let express= require("express");
let bodyParser = require("body-parser");

let webServer=express();

webServer.use ( bodyParser.urlencoded() ); // middleware extracts data from Post packet and put it in request.body

webServer.listen(9001);

function handler(request,response){
	let str="";
	str+="<h1> Welcome <h1>";
	
	response.send(str);		
}

webServer.get("/",handler);

webServer.get("/table/:number",function(request,response){
	let n=Number(request.params.number || 0 );
	
	let str=""	

	for(let i=1;i<=10;i++){
		str+= n + " x " + i + " = " + n*i + "<br>";			
	}
	response.send(str);
});



webServer.get("/prime", function(request,response){
	
	let str="<html><body><form action='/prime' method='post'> <h3> Enter Number </h3> <input type='number' name='x'> <button>Submit</button></form></body></html>";

	response.send(str);
});


webServer.post("/prime", function(request,response){

	let n=Number( request.body["x"] || 0);
	
	let str="<html><body><form action='/prime' method='post'> <h3> Enter Number </h3> <input type='number' value="+n+" name='x'> <button>Submit</button><br/><br/>";
	
	let flag=true;

	for(let i=2;i<n/2;i++){
		if(n%i==0){
			flag=false;
			break;
		}
	}
	if(flag){
		str+= n + " is prime number.";
	}
	else {
		str+= n + " is not prime number. ";
	}
	response.send(str);
});



webServer.get("/prime/ajax", function(request,response){
	let n=Number( request.params.number || 0);
	
	let str=`
<html>
<body>
	<h3>Enter Number </h3> 
	<input type='number' id='x'> 
	<button type='button' onclick='ajaxSubmit()'>Submit</button>
	<div id='output'></div>
</body>
</html> 

<script> 
function ajaxSubmit() { 
let xhr = new XMLHttpRequest(); 
xhr.open('POST', '/prime/ajax/submit', true); 
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
xhr.onload = function() { 
	document.getElementById('output').innerHTML = xhr.responseText; 
}; 
xhr.send("x=" + document.getElementById("x").value); 
} 
</script>`;

response.send(str);
});


webServer.post("/prime/ajax/submit", function(request,response){

	let n=Number( request.body["x"] || 0);
	
	let flag=true;

	for(let i=2 ; i <= n/2; i++ ){
		if(n%i==0){
			flag=false;
			break;
		}
	}
	let str = "";
	if(flag){
		str+= n + " is prime number.";
	}
	else {
		str+= n + " is not prime number. ";
	}
	response.send(str);
});