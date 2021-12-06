
let take = 8;
let skip = 0;

let loadMore1Button = document.getElementById("load_more1");
let loadMore2Button = document.getElementById("load_more2");

// Helper method for displayBooksTable
function getTableRows(books) {
    let tableRows = "" ;

    // iterator
    for(let book of books){ 
        tableRows += `<tr><th>${book.title}</th><th>${book.author}</th><th>${book.price}</tr>`;
    }

    return tableRows;
}

let cacheTableRows = "" ; 
// This functions displays table
function displayBooksTable(books){

    cacheTableRows += getTableRows(books);

    const tableHTML = `<h3>Books </h3>
    <table border="1">
       <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
       </tr>
       ${cacheTableRows}
    </table>` ;

    document.getElementById("output").innerHTML = tableHTML ;
}

// Called on button click
function getAllBooks(){
    
    let xhr=new XMLHttpRequest();

    xhr.open("GET",`/getAllBooks/${skip}/${take}`,true);
    
    xhr.setRequestHeader('Content-type','application/json');
    
    xhr.onload=function(){
        const json=xhr.responseText;

        // JSON.parse(json) - JSON Deserialization
        //const {books, loadMore} => Object destructuring
        const {books, loadMore} = JSON.parse(json);

        skip += take;

        loadMore1Button.style= loadMore ? "visibility:visible": "visibility:hidden";
      
        displayBooksTable(books);
    };

    xhr.send();

 }



// Here Get all Book by author name
function getBooksbyAuthorName(){

    let author=document.getElementById("author_name").value;

    let xhr=new XMLHttpRequest();

    xhr.open("GET",`/byAuthor/${author}/${skip}/${take}`,true);

    xhr.setRequestHeader('Content-type','application/json');

    xhr.onload=function(){

        const json=xhr.responseText;

        const {books , loadMore} = JSON.parse(json);

        skip+=take;

        loadMore2Button.style= loadMore ? "visibility:visible" : "visibility:hidden";

        displayBooksTable(books);

    }

    xhr.send();
}