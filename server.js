const express = require("express");
const joi = require("joi");
const app = express();
app.use(express.json());
// const books = require("./data");

const books = [
    {title: "Harry Potter Edition-1", id: 1},
    {title: "Harry Potter Edition-2", id: 2},
    {title: "Twilight", id: 3},
    {title: "Harry Potter Latest Edition-2023", id: 4}
]


//PORT Environment variables
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}...`));

//Request handlers----->
app.get('/',(req,res)=>{
    res.send("Welcome to Harsh's REST API with Nods.JS Practical Session!!");
});

/**READ 
 * REQUEST HANDLER
 * Reading data and rendring it over a endpoint..
 * /api/books
 */
app.get('/api/books',(req,res)=>{
    res.send(books);
})


//finding by id specifically
app.get('/api/books/:id',(req,res)=>{
    const book = books.find(c=>c.id===parseInt(req.params.id));
    if(!book) res.status(404).send('<h2>Ooops.... Cant find what you are looking for!<h2>');
    res.send(book);
});


/**CREATE
 * REQUEST HANDLER
 * Creating a new data/book detail in the predefined data..
 */

app.post('/api/books',(req,res)=>{
    const {error} = validateBook(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    const book = {
        id: books.length+1,
        title: req.body.title
    };
    books.push(book);
    res.send(book);
})

/**
 * UPDATE
 * REQUEST HANDLER
 * Updating the exist data
 */

app.put('/api/books/:id',(req,res)=>{
    const book = books.find(c=> c.id===parseInt(req.params.id));
    if(!book) res.status(404).send("<h2>Not Found!!</h2>");
    const { error } = validateBook(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    book.title = req.body.title;
    res.send(book);
})

/**
 * DELETE
 * REQUEST HANDLER
 * Deleting record from the data 
 */

app.delete('/api/books/:id',(req,res)=>{
    const book = books.find(c=>c.id===parseInt(req.params.id));
    if(!book) res.status(404).send("<h2>Not Found!!</h2>");
    
    const index = books.indexOf(book);
    books.splice(index,1);

    res.send(book);
});

//validation------->
function validateBook(book){
    const schema = joi.object({
        title: joi.string().min(3).required()
    });
    return schema.validate(book);
}





