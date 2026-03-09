const express = require('express');
const app = express();
const PORT = 3000;
let books=[{id:"1",title:",mmc",details:"dytghdg"}];
app.use(express.json());

// Your routes here
app.get('/whoami',(req,res)=>{
    // Returns your student number
    const studentNum={studentNumber:"2821750"};
    res.json(studentNum);
});
app.get('/books',(req,res)=>{
    // return all books
    res.json(books);
});
//  get a specific book
app.get('/books/:id',(req,res)=>{
    const id=req.params.id;
    const specific_book=books.find((book)=>book.id===id);
   
  if (!specific_book) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json(specific_book);
   
});
//  add a book in the books collection
app.post('/books',(req,res)=>{
    // get the book from body
    const book={id:req.body.id,title:req.body.title,details:req.body.details};
    if(!book.id || !book.title){
        return res.status(400).json({error:"Missing required fields"});
    }
    res.json(book);
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
    res.json(book);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});