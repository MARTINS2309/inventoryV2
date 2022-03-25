const express = require('express')
const router = express.Router()
const db = require("../db")

// create a GET route for Stock Events
router.get('/', (req, res) => {
    db
        .any("SELECT id, type, qty, created_at, updated_at, published_at, product_id FROM stockevents INNER JOIN stockevents_product_links ON id = stockevent_id;")
        .then(rows => {
            res.json(rows)
        })
        .catch(error =>{
            console.log('error', error)
        })

    console.log('GET stockEvents')
});

// create route to cover all by id requests
router
    .route('/:id')
    .get((req, res) => {
        db
        .any(`SELECT id, type, qty, created_at, updated_at, published_at, product_id FROM stockevents INNER JOIN stockevents_product_links ON id = stockevent_id WHERE id= ${req.params.id};`)
        .then(rows => {
            res.json(rows)
        })
        .catch(error =>{
            console.log('error', error)
        })
    })
    .put((req, res) => {
        res.send('update stockEvent '+req.params.id);
    })
    .delete((req, res) => {
        res.send('delete stockEvent '+req.params.id);
});

router.param("id", (req, res, next, id) => {
    console.log(`GET stockEvent id:${id}`)
    next()
})


module.exports = router