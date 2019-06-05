const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel');
const shuffle = require('../libs/shuffle')

/* GET home page. */
router.get('/', function(req,res){

    let newItems = [], lastItems = [];

    ProductsModel.find({}).exec((err,products)=>{ 

        products.forEach(product =>{
            if(product.endDate > new Date()){
                newItems.push(product)
            }else{
                lastItems.push(product)
            }
        })

        let newImages = shuffle(newItems)

        res.render( 'home' , 
            { products : newImages, endProducts : lastItems } 
        );
    });
});

router.post('/', function(req,res){
    
    let newItems = [], lastItems = [];

    ProductsModel.find({name : {
        $regex: req.body.search
    }}).sort({endDate : -1}).exec((err,products)=>{ 
        console.log("products",products)

        products.forEach(product =>{
            if(product.endDate > new Date()){
                newItems.push(product)
            }else{
                lastItems.push(product)
            }
        })

        let newImages = shuffle(newItems)

        res.render( 'home' , 
            { products : newImages, endProducts : lastItems } 
        );
    });
});


router.get('/category/:category', function(req,res){
    
    let newItems = [], lastItems = [];

    let category = req.params.category;

    ProductsModel.find({category : category}).sort({endDate : -1}).exec((err,products)=>{ 

        products.forEach(product =>{
            if(product.endDate > new Date()){
                newItems.push(product)
            }else{
                lastItems.push(product)
            }
        })

        let newImages = shuffle(newItems)

        res.render( 'home' , 
            { products : newImages, endProducts : lastItems } 
        );
    });
});
router.post('/search', function(req,res){
    
    console.log("searchItem > > > ",req.params.search || req.query.search)
    console.log("query > > > ",req.query)

    let query = {
        title : {
            $regex: req.params.search || req.query.search //`.*${decodeURI(req.params.search || req.query.search)}.*`
        }
    };

    ProductsModel.find({query}).sort({endDate : -1}).exec((err,products)=>{ 

        products.forEach(product =>{
            if(product.endDate > new Date()){
                newItems.push(product)
            }else{
                lastItems.push(product)
            }
        })

        let newImages = shuffle(newItems)

        res.render( 'home' , 
            { products : newImages, endProducts : lastItems } 
        );
    });
});

module.exports = router;