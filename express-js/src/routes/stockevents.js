const express = require('express')
const router = express.Router()

// create a GET route for Stock Events
router.get('/', (req, res) => {
    res.send({ 
        data: [{
          id: 1,
          attributes:{
            type: 'remove',
            qty: -100,
            createdAt:	"2022-02-18T10:59:02.976Z",
            updatedAt:	"2022-02-18T10:59:23.930Z",
            publishedAt:	"2022-02-18T10:59:23.929Z",
            product: {
              data: {
                id: 1,
                attributes:{
                  name: "App connected",
                  createdAt:	"2022-02-18T10:47:49.151Z",
                  updatedAt:	"2022-02-18T10:58:40.866Z",
                  publishedAt:	"2022-02-18T10:58:40.865Z", 
                }
              }
            }
          }
        }]
    });
    console.log('stockEvents')
});


module.exports = router