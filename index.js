const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
require('express-async-errors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Check the database connection

app.get('/student', async (req, res) => {
  // try {
  //   const sqlInsert = "INSERT INTO students (name, email, contact) VALUES('john', 'jhon@gmsil.com', '33533121')";
  //   const result = await db.query(sqlInsert);
  //   console.log("result", result);
  //   // res.send('hello');
  // } catch (error) {
  //   console.error("error", error);
  //   res.status(500).send('Internal Server Error');
  // }
});
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

app.put("/api/put/:id", async(req, res)=>{
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


db.query("SELECT 1")
  .then((data) => {
    console.log('DB connection succeeded', data);

    // app.post('/api/post', async (req, res) => {
    //   console.log('ayayaayayaya');
    //   try {
    //     const { bookCode, bookName, quantity, bookGroup, writerName, publisherName } = req.body;
    //     const sql = `INSERT INTO books (bookCode, bookName, quantity, bookGroup, writerName, publisherName) VALUES (?, ?, ?, ?, ?, ?)`;
    //     await db.query(sql, [bookCode, bookName, quantity, bookGroup, writerName, publisherName]);
    //     console.log('Data saved successfully');
    //     res.json({ success: true });
    //    res.send('hello book' );

    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to save data to the database' });
    //   }
    // });

    // Start the server
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log('DB connection failed. \n' + err));
