let express=require("express");
let bodyParser = require("body-parser");
let webServer=express();
webServer.use ( bodyParser.urlencoded() ); // middleware extracts data from Post packet and put it in request.body

webServer.get("/",function(request,response){
    let str=`
    <html>
    <body>
        <h1>Calculator</h1>
        <p>First Number :- <input type="number" id="first"> </p>
        <p>Second Number :- <input type="number" id="second"> </p>
        <input type="button" onclick='add()' value="Add">
        <input type="button" onclick='sub()' value="Substraction">
        <input type="button" onclick='mul()' value="Multiplication">
        <input type="button" onclick='div()' value="Division">
        <br/>
        <h3 name="result" id="result"></h3>
    </body>
    <script>

        function add(){
            let first=document.getElementById("first").value;
            let second=document.getElementById("second").value;
            xhr=new XMLHttpRequest();
            xhr.open("POST","/add",true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xhr.onload = function() { 
                document.getElementById('result').innerHTML = xhr.responseText; 
            };
            xhr.send("first="+first+"&second="+second)
        }
        function sub(){
            let first=document.getElementById("first").value;
            let second=document.getElementById("second").value;
            xhr=new XMLHttpRequest();
            xhr.open("POST","/sub",true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xhr.onload = function() { 
                document.getElementById('result').innerHTML = xhr.responseText; 
            };
            xhr.send("first="+first+"&second="+second)
        }
        function mul(){
            let first=document.getElementById("first").value;
            let second=document.getElementById("second").value;
            xhr=new XMLHttpRequest();
            xhr.open("POST","/mul",true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xhr.onload = function() { 
                document.getElementById('result').innerHTML = xhr.responseText; 
            };
            xhr.send("first="+first+"&second="+second)
        }
        function div(){
            let first=document.getElementById("first").value;
            let second=document.getElementById("second").value;
            xhr=new XMLHttpRequest();
            xhr.open("POST","/div",true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xhr.onload = function() { 
                document.getElementById('result').innerHTML = xhr.responseText; 
            };
            xhr.send("first="+first+"&second="+second)
        }
    </script>
</html>
    `;
    response.send(str);
});

webServer.post("/add",function(request,response){
    let result=Number(request.body['first'])+Number(request.body['second']);
    response.send("Result is " + result);
});
webServer.post("/sub",function(request,response){
    let result=Number(request.body['first'])-Number(request.body['second']);
    response.send("Result is " + result);
});

webServer.post("/mul",function(request,response){
    let result=Number(request.body['first'])*Number(request.body['second']);
    response.send("Result is " + result);
});

webServer.post("/div",function(request,response){
    let result=Number(request.body['first'])/Number(request.body['second']);
    response.send("Result is " + result);
});


webServer.listen(9001);