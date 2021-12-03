let number=0;
let number_of_books_to_load=8;
let flag=false;
let curren_btn_clicked="";

let str=`
<h3>Books </h3>
    Price Sort <br/>
    <table border="1">
       <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
        </tr>
`;    
function getBook(){

    if(document.getElementById("ase")){
        console.log("ase")
    }
    if(document.getElementById("des")){
        console.log("des")
    }

    let xhr=new XMLHttpRequest();
    xhr.open("GET","/getAllBooks",true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send();
    flag=true;
    xhr.onload=function(){
        let json=xhr.responseText;
        let books=JSON.parse(json);  
        for(let i=0;i<number_of_books_to_load;i++){
            if(number>=books.length){
                flag=false;
                break;
            }
           str+="<tr><th>"+books[number].title+"</th><th>"+books[number].author+"</th><th>"+books[number].price+"</tr>" 
           number++;
        }
        document.getElementById("output").innerHTML=str;
        visible();
        curren_btn_clicked="all";
    }
}
function visible(){
    if(flag){
        document.getElementById("load_more").style="visibility:visible";
    }
    else{
        document.getElementById("load_more").style="visibility:hidden";
    }
}


function getBookByAuthorName(){
    let xhr=new XMLHttpRequest();
    xhr.open("POST","/byAuthor",true);
    xhr.setRequestHeader('Content-type','application/json');
    flag=true;
    xhr.onload=function(){
        let json=xhr.responseText;
        let books=JSON.parse(json);  
        for(let i=0;i<number_of_books_to_load;i++){
            if(number>=books.length){
                flag=false;
                break;
            }
           str+="<tr><th>"+books[number].title+"</th><th>"+books[number].author+"</th><th>"+books[number].price+"</tr>" 
           number++;
        }        
        document.getElementById("output").innerHTML=str;
        visible();
        curren_btn_clicked="author";
    }
    let author=document.getElementById("author_name").value;
    let data={author:author};
    xhr.send(JSON.stringify(data));
}

function get(){
    if(curren_btn_clicked=="all"){
        getBook();
    }
    else{
        getBookByAuthorName();
    }
}