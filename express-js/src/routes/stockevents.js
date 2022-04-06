const express = require('express')
const router = express.Router()
const db = require("../db")

// create a GET route for Stock Events
router.get('/', (req, res) => {
    db
    .any("SELECT id, type, qty, created_at, updated_at, published_at, product_id FROM stockevents INNER JOIN stockevents_product_links ON id = stockevent_id;")
    .then(rows => {
        res.json(rows)
        console.log('GET - stockEvents')
    })
    .catch(error =>{
        res.sendStatus(500)
        console.log('error', error)
    })
});


// create a POST route for new StockEvent
router.post('/', (req, res) => {
    db
    .any(`WITH ins1 as ( INSERT INTO stockevents(type, qty, created_at, updated_at, published_at) VALUES( '${req.body.type}', ${req.body.qty}, '${req.body.created_at}', '${req.body.updated_at}', '${req.body.published_at}' ) RETURNING id ) INSERT INTO stockevents_product_links(stockevent_id, product_id) VALUES((SELECT id FROM ins1) , ${req.body.product_id}) RETURNING (SELECT id FROM ins1);`)
    .then(rows => {
        res.json(rows)
        console.log(`POST - stockEvent ${req.body.product_id} > ${req.body.type} >> ${req.body.qty}`)
    })
    .catch(error =>{
        res.sendStatus(500)
        console.log('error', error)
    })
});

// create route to cover all by id requests
router
    .route('/:id')
    .get((req, res) => {
        db
        .any(`SELECT id, type, qty, created_at, updated_at, published_at, product_id FROM stockevents INNER JOIN stockevents_product_links ON id = stockevent_id WHERE id= ${req.params.id};`)
        .then(rows => {
            res.json(rows)
            console.log(`GET - by id > ${req.params.id}`)
        })
        .catch(error =>{
            res.sendStatus(500)
            console.log('error', error)
        })
    })
    .put((req, res) => {
        db
        .any(`WITH up1 as( UPDATE stockevents SET type= '${req.body.type}', qty= ${req.body.qty}, updated_at= '${req.body.updated_at}' WHERE id= ${req.params.id} RETURNING id ) UPDATE stockevents_product_links SET product_id=${req.body.product_id} WHERE stockevent_id = (SELECT id FROM up1) RETURNING stockevent_id;`)
        .then(rows => {
            res.json(rows)
            console.log(`PUT - ${req.body.product_id} > ${req.body.type} >> ${req.body.qty}`)
        })
        .catch(error =>{
            res.sendStatus(500)
            console.log('error', error)
        })
    })
    .delete((req, res) => {
        db
        .any(`DELETE FROM stockevents WHERE id= ${req.params.id};`)
        .then(() => {
            res.sendStatus(200)
            console.log(`DELETE - ${req.params.id}`)
        })
        .catch(error =>{
            res.sendStatus(500)
            console.log('error', error)
        })
    })
    
    
router.param("id", (req, res, next, id) => {
    console.log(`stockEvent id:${id}`)
    next()
})

module.exports = router