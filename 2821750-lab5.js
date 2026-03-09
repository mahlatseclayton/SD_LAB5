const express = require('express');
const app = express();
const PORT = 3000;
let books=[];
app.use(express.json());

// Your routes here
app.get('/whoami',(req,res)=>{
    // Returns your student number
    const studentNum={studentNumber:"2821750"};
    res.status(200).json(studentNum);
});
app.get('/books',(req,res)=>{
    // return all books
    res.status(200).json(books);
});
//  get a specific book
app.get('/books/:id',(req,res)=>{
    const id=req.params.id;
    const specific_book=books.find((book)=>book.id===id);
   
  if (!specific_book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json(specific_book);
   
});
//  add a book in the books collection
app.post('/books',(req,res)=>{
    // get the book from body
    const book={id:req.body.id,title:req.body.title,details:req.body.details};
    if(!book.id || !book.title){
        return res.status(400).json({error:"Missing required fields"});
    }
    books.push(book);
    res.status(201).json(book);
});
//  update book
app.put('/books/:id',(req,res)=>{
    const id=req.params.id;
    const book=books.find((book)=>book.id===id);
    const update_value=req.body.title;
   
    if(!book){
        return res.status(404).json({error:"Book not found"});
    }
     book.title=update_value;
    res.status(200).json(book);
});
// delete book
app.delete('/books/:id',(req,res)=>{
    const id=req.params.id;
    const book=books.find((book)=>book.id===id);
    if(!book){
        return res.status(404).json({error: "Book not found"});
    }
    if(book){
        books.filter((book)=>book.id===id);
        res.status(200);
    }
});
app.post('/books/:id/details',(req,res)=>{
    const id=req.params.id;
    const details=req.body.details;
    const book=books.find((book)=>book.id===id);
    if(!book){
        return res.status(404).json({ "error": "Book not found"});
    }
     if (!book.details) {
        book.details = [];
    }
     book.details.push(req.body);
    res.status(201).json(book);
});

// Removes a specific detail from a book.
app.delete('/books/:id/details/:detailId',(req,res)=>{
    const id=req.params.id;
    const detailId=req.params.detailId;
    const book=books.find((book)=>book.id===id);
    const detailIndex = book.details.findIndex(d => d.id === detailId);
    if(!book || detailIndex===-1){
         return res.status(404).json({ "error": "Book or detail not found"});
    }
    book.details.splice(detailIndex, 1)[0];
    res.status(201);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});