let express=require("express");
let bodyParser = require("body-parser");
let webServer=express();
webServer.use ( bodyParser.urlencoded() ); // middleware extracts data from Post packet and put it in request.body


webServer.get("/",function(request,response){
    let str=`
    <html>
        <body>
        <form action="/calculate" method="POST">
            <h1>Calculator</h1>
            <p>First Number :- <input type="number" name="first"> </p>
            <p>Second Number :- <input type="number" name="second"> </p>
            <input type="submit" value="Add" name="method" />
            <input type="submit" value="Sub" name="method" />
            <input type="submit" value="Mul" name="method" />
            <input type="submit" value="Div" name="method" />
            <br/><br/>
            <h3 name="result" id="result"></h3>
        </form>
        </body>
        <script>
            
        </script>
    </html>
    `
    response.send(str);
});

webServer.post("/calculate",function(request,response){
    let first=Number(request.body["first"]);
    let second=Number(request.body["second"]);
    let method=request.body["method"];
    let result=0;

    if(method=="Add"){
        result=first+second;
    }
    else if(method=="Sub"){
        result=first-second;
    }
    else if(method=="Mul"){
        result=first*second;
    }
    else if(method=="Div"){
        result=first/second;
    }

    let str=`
    <html>
        <body>
        <form action="/calculate" method="POST">
            <h1>Calculator</h1>
            <p>First Number :- <input type="number" name="first" value=${first}> </p>
            <p>Second Number :- <input type="number" name="second" value=${second}> </p>
            <input type="submit" value="Add" name="method" />
            <input type="submit" value="Sub" name="method" />
            <input type="submit" value="Mul" name="method" />
            <input type="submit" value="Div" name="method" />
            <br/><br/>
            <h3 name="result" id="result">Result= ${result}</h3>
        </form>
        </body>
    </html>
    `
    response.send(str);
});


webServer.listen(9001);