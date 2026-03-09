const express = require('express');
const app = express();
const PORT = 3000;
let books=[];
app.use(express.json());

// Your routes here
app.get('/whoami/:studentNumber',(req,res)=>{
    // Returns your student number
    const studentNum=req.params.studentNumber;
    res.json(studentNum);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});