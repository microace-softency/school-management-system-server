const express = require('express')
app= express();
const cors = require('cors');


const db = require('./db');
employeesRoutes = require('./controllers/employee.controller')
app.use(cors());


//middleware
app.use('/api/employees', employeesRoutes)

app.get("/api/get", async(req, res)=>{
    await db.query("SELECT * FROM customer")
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

db.query("SELECT 1")
.then((data)=>{
    console.log('db Cpnnection succeeded', data)
    app.listen(3002,
            () => console.log('server started at 3002')
        )
})
.catch(err => console.log('db connection failed. \n' + err))