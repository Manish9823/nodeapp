let books = [
    { title: "T1", author: "A1", price: 1000 },
    { title: "T2", author: "A1", price: 2000 },
    { title: "T3", author: "A2", price: 3000 },
    { title: "T4", author: "A3", price: 1000 },
    { title: "T5", author: "A4", price: 100 },
    { title: "T6", author: "A5", price: 1000 },
    { title: "T7", author: "A4", price: 100 },
    { title: "T8", author: "A2", price: 1000 },
    { title: "T9", author: "A3", price: 10000 },
    { title: "T10", author: "A2", price: 100 },
    { title: "T11", author: "A1", price: 100000 },
    { title: "T12", author: "A2", price: 100 },
    { title: "T13", author: "A5", price: 1000 },
    { title: "T14", author: "A6", price: 1000 },
    { title: "T15", author: "A7", price: 1 },
    { title: "T16", author: "A6", price: 10 },
    { title: "T17", author: "A5", price: 1000 },
    { title: "T18", author: "A4", price: 10000 },
    { title: "T19", author: "A3", price: 1000 },
    { title: "T20", author: "A2", price: 1000 },
    { title: "T21", author: "A1", price: 100000 },
    { title: "T22", author: "A2", price: 10000000 },
    { title: "T23", author: "A3", price: 100 },
    { title: "T24", author: "A5", price: 10000 },
    { title: "T25", author: "A6", price: 10000 },
    { title: "T26", author: "A7", price: 100000 },
    { title: "T27", author: "A8", price: 100000 },
    { title: "T28", author: "A8", price: 100000 },
    { title: "T29", author: "A2", price: 100 },
    { title: "T30", author: "A2", price: 100 },
    { title: "T31", author: "A2", price: 100 },
    { title: "T32", author: "A2", price: 10000 },
    { title: "T33", author: "A2", price: 100000 },
    { title: "T34", author: "A2", price: 100000 },
    { title: "T35", author: "A2", price: 100000 },
    { title: "T36", author: "A2", price: 100 },
    { title: "T37", author: "A2", price: 100 },
    { title: "T38", author: "A2", price: 100 }
];

const { json } = require("body-parser");
let express = require("express");
let webServer = express();
webServer.use(express.json());
webServer.use(express.static("public")) ; // opening the folder for browser to obtain the file by sending http request to the server

 webServer.listen(9001);

webServer.get("/", function (request, response) {
    let str = `
            <html>
                <body>
                    <button onclick="getAllBooks()">Get All Books</button>
                    <br/><br/>
                    Enter Author name for Book <br/>
                    <input type="text" id="author_name"> <button onclick="getBooksbyAuthorName()"> Get Book </button>
                    <br/>
                    <div id="output"></div>
                    <input type="button" value="Load More" id="load_more1" onclick="getAllBooks()" style="visibility:hidden">
                    <input type="button" value="Load More" id="load_more2" onclick="getBooksbyAuthorName()" style="visibility:hidden">
                </body>
                <script src="app6client.js"></script>
            </html>
        `;
    response.send(str);
});


// Route for Get All Books 
webServer.get("/getAllBooks/:skip/:take", function (request, response) {
    let skip=Number(request.params.skip);
    let take=Number(request.params.take);

    if ( skip > books.length ||  skip < 0 || take <= 0 ) {
        let result = {
            books : null,
            loadMore : false 
        };
        response.json(result); // response.send ( JSON.stringify(result));
        return ;
    }
    
    let loadMore = true;
    
    let numberOfItemsToBeFetched=skip + take ;

    if(numberOfItemsToBeFetched > books.length){
        numberOfItemsToBeFetched = books.length;
        loadMore = false;
    }

    // let newBooks = [] ;
    // for(let i  = skip; i < numberOfItemsToBeFetched ; i++ ){
    //     newBooks.push(books[i]);
    // }

    
    let result = {
        books : books.slice ( skip, skip + take ),
        loadMore
    };

    response.send(JSON.stringify(result));
});



// Route for require author book 

function getBooksByAuthorLogic(books, author, skip, take) { 
    let loadMore = true;

    if ( skip > books.length ||  skip < 0 || take <= 0 ){
        const result = {
            books: null,
            loadMore: false
        };
        return result ; 
    } ;

    let numberOfItemsToBeFetched = skip + take;
    
    let booksByAuthor = books.filter( function(book) { return book.author == author ; } );

    if(numberOfItemsToBeFetched >= booksByAuthor.length ) {
        loadMore = false;
    }

    const result={
        books:booksByAuthor.slice ( skip, skip + take),
        loadMore
    } ;
    return result ; 
}

webServer.get(`/byAuthor/:author/:skip/:take`, function(request,response){
    
    const author = request.params.author;

    const skip = Number(request.params.skip);

    const take = Number(request.params.take);

    response.json(getBooksByAuthorLogic(books, author, skip, take));
});


// Test Cases
// let result1 = getBooksByAuthorLogic ( [ { author : "A1" }, { author : "A1" } ], "A1", 0, 2 ) ;
// console.log (result1.loadMore === false);
// console.log (result1.books.length === 2);

// let result2 = getBooksByAuthorLogic ( [ { author : "A1" }, { author : "A2" } ], "A1", 0, 2 ) ;
// console.log (result2.loadMore === false);
// console.log (result2.books.length === 1);

// let result3 = getBooksByAuthorLogic ( [ { author : "A1" }, { author : "A1" }, { author : "A1" } ], "A1", 0, 2 ) ;
// console.log (result3.loadMore === true);
// console.log (result3.books.length === 2);

// let result4 = getBooksByAuthorLogic ( [ { author : "A1" }, { author : "A1" }, { author : "A1" } ], "A1", 2, 2 ) ;
// console.log (result4.loadMore === false);
// console.log (result4.books.length === 1);

// let result5 = getBooksByAuthorLogic ( [ { author : "A1" }, { author : "A1" }, { author : "A1" } ], "A1", -1, 2 ) ;
// console.log (result5.loadMore === false);
// console.log (result5.books === null);