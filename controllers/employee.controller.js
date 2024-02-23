const express = require('express')
router= express.Router()

const db = require('../db')

router.get('/', async(req, res)=>{
    await db.query("SELECT * FROM customer")
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

module.exports = router;