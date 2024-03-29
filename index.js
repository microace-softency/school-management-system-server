const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
require('express-async-errors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Check the database connection

// app.get('/class', async (req, res) => {
//   try {
//     const sqlInsert = "INSERT INTO class (classcode, classname) VALUES('1001', 'classV')";
//     const result = await db.query(sqlInsert);
//     console.log("result", result);
//     res.send('hello');
//   } catch (error) {
//     console.error("error", error);
//     res.status(500).send('Internal Server Error');
//   }
// });

//-----student-------------//
app.get("/api/student", async(req, res)=>{
  await db.query("SELECT * FROM students ")
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

app.post("/api/post", (req, res)=>{
  const{name,email,contact}= req.body
  const sqlInsert = "INSERT INTO students (name, email, contact) VALUES(?, ?,?)";
  db.query(sqlInsert,[name, email, contact], (error, result)=>{
    if(error){
      console.log(error);
    }
  })
})

app.delete("/api/remove/:id", (req, res)=>{
  const{id}= req.params
  const sqlRemove = "DELETE FROM students WHERE id = ?";
  db.query(sqlRemove,id, (error, result)=>{
    if(error){
      console.log(error);
    }
  })
})

app.get("/api/student/:id", async (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM students WHERE id = ?";
  
  try {
    const result = await db.query(sqlGet, id);

    if (result.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put("/api/update/:id", async(req, res)=>{
  const{id}= req.params;
  const{name,email,contact}= req.body
  const sqlUpdate = "UPDATE students SET name = ?, email = ?, contact = ? WHERE id = ?";
  await db.query(sqlUpdate, [name, email, contact, id], (error, result ) =>{
    if (error) {
      console.log(error);
    }
    res.send(result)
  })
})

//-----class-------------//

//fetch class data
app.get("/api/class", async(req, res)=>{
  await db.query("SELECT * FROM class ")
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

//create class data
app.post("/api/createclass", (req, res)=>{
  const{classcode,classname}= req.body
  const sqlInsert = "INSERT INTO class (classcode, classname) VALUES(?, ?)";
  db.query(sqlInsert,[classcode, classname], (error, result)=>{
    if(error){
      console.log(error);
    }
  })
})

//class remove
app.delete("/api/removeclass/:id", (req, res)=>{
  const{id}= req.params
  const sqlRemove = "DELETE FROM class WHERE id = ?";
  db.query(sqlRemove,id, (error, result)=>{
    if(error){
      console.log(error);
    }
  })
})

//Class details view
app.get("/api/class/:id", async (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM class WHERE id = ?";
  
  try {
    const result = await db.query(sqlGet, id);

    if (result.length === 0) {
      res.status(404).json({ error: 'class not found' });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Class details update
app.put("/api/classupdate/:id", async(req, res)=>{
  const{id}= req.params;
  const{classcode, classname}= req.body
  const sqlUpdate = "UPDATE class SET classcode = ?, classname = ? WHERE id = ?";
  await db.query(sqlUpdate, [classcode, classname, id], (error, result ) =>{
    if (error) {
      console.log(error);
    }
    res.send(result)
  })
});


//-----Bookmaster-------------//
app.get("/api/book", async(req, res)=>{
  await db.query("SELECT * FROM books ")
  .then(data => res.send(data))
  .catch(err => console.log(err))
})
//create book data
app.post("/api/createbook", (req, res)=>{
  const{bookCode, bookGroup, bookName,  publisherName, quantity, writerName}= req.body
  const sqlInsert = "INSERT INTO books (bookCode, bookGroup, bookName,  publisherName, quantity, writerName) VALUES( ?, ?, ?, ?, ?, ?)";
  db.query(sqlInsert,[bookCode, bookGroup, bookName,  publisherName, quantity, writerName], (error, result)=>{
    if(error){
      console.log(error);
    }
  })
})
//book remove
app.delete("/api/removebook/:id", (req, res)=>{
  const{id}= req.params
  const sqlRemove = "DELETE FROM books WHERE id = ?";
  db.query(sqlRemove,id, (error, result)=>{
    if(error){
      console.log(error);
    }
  })
});
//book details view
app.get("/api/book/:id", async (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM books WHERE id = ?";
  
  try {
    const result = await db.query(sqlGet, id);

    if (result.length === 0) {
      res.status(404).json({ error: 'class not found' });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Book details update
app.put("/api/updatebook/:id", async(req, res)=>{
  const{id}= req.params;
  const{bookCode, bookGroup, bookName,  publisherName, quantity, writerName}= req.body
  const sqlUpdate = "UPDATE books SET bookCode = ?, bookGroup = ?, bookName = ?,  publisherName = ?, quantity = ?, writerName = ? WHERE id = ?";
  await db.query(sqlUpdate, [bookCode, bookGroup, bookName,  publisherName, quantity, writerName, id], (error, result ) =>{
    if (error) {
      console.log(error);
    }
    res.send(result)
  })
});

//-----section-------------//
// app.get('/section', async (req, res) => {
//     try {
//       const sqlInsert = "INSERT INTO section (sectionname, classname) VALUES('sectionE', 'classVI')";
//       const result = await db.query(sqlInsert);
//       console.log("result", result);
//       res.send('hello');
//     } catch (error) {
//       console.error("error", error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

//fatched section 
app.get("/api/section", async(req, res)=>{
  await db.query("SELECT * FROM section ")
  .then(data => res.send(data))
  .catch(err => console.log(err))
});


db.query("SELECT 1")
  .then((data) => {
    console.log('DB connection succeeded', data);

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log('DB connection failed. \n' + err));