const express = require('express')
const router = express.Router()
const db = require("../db")


const sampleProduct= { 
    data: [{
        id: 1,
        name: "App connected",
        createdAt:	"2022-02-18T10:47:49.151Z",
        updatedAt:	"2022-02-18T10:58:40.866Z",
        publishedAt:	"2022-02-18T10:58:40.865Z"
    }]
}

// create a GET route for all Products
router.get('/', (req, res) => {
    db
        .any("SELECT id, name, created_at, updated_at, published_at FROM products;")
        .then(rows => {
            res.json(rows)
        })
        .catch(error =>{
            res.sendStatus(500)
            console.log('error', error)
        })

    console.log('GET products')
});

// create a POST route for new Product
router.post('/', (req, res) => {
    db
        .none("INSERT INTO products (name, created_at, updated_at, published_at) VALUES (${name}, ${created_at}, ${updated_at}, ${published_at})", req.body)
        .then(() => {
            res.sendStatus(201)
        })
        .catch(error =>{
            res.sendStatus(500)
            console.log('error', error)
        })
     
    console.log('POST product - ' + req.body.name)
});

// create route to cover all by id request
router
    .route('/:id')
    .get((req, res) => {
        db
        .any(`SELECT id, name, created_at, updated_at, published_at FROM products WHERE id= ${req.params.id};`)
        .then(rows => {
            res.json(rows)
        })
        .catch(error =>{
            console.log('error', error)
        })
        console.log('GET')
    })
    .put((req, res) => {
        res.send('update product '+req.params.id);
        console.log('update')
    })
    .delete((req, res) => {
        res.send('delete product '+req.params.id);
        console.log('delete')
});

router.param("id", (req, res, next, id) => {
    console.log(`product id:${id} `)
    next()
})

module.exports = router