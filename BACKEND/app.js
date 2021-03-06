const express = require('express');
const ProductData = require('./src/model/Productdata');
const cors = require('cors');
const jwt = require("jsonwebtoken");
var bodyparser = require('body-parser');
const User = require('./src/model/user');
var app = new express();
app.use(cors());
app.use(bodyparser.json())

//PRODUCTS LIST
app.get('/products',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    ProductData.find()
                    .then(function(products){
                        res.send(products);
                    });
});

//ADD PRODUCT
app.post('/insert',  function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    var product = {
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl
    }
    var product = new ProductData(product);
    product.save();
});

//SIGNUP
app.post('/register' ,  (req,res) =>{
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) =>{
        if(err){
            console.log(err)
        }else{
            let payload = {subject : user._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})  
        }
    });
});

//LOGIN
app.post('/login',(req,res) =>{
    let userData = req.body
    User.findOne({email : userData.email} , (err,user) =>{
        if(err){
            console.log(err)
        }else{
            if(!user){
                res.status(401).send('Invalid Email')
            } else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid Password')
                }else{
                    
                    let payload = {subject : user._id}
                    let token = jwt.sign(payload,'secretKey')
                    res.status(200).send({token})

                }
            }          
            
        }
    })
}) 

//DELETE
app.delete("/delete/:id",function(req,res){  
    const id = req.params.id;   
    ProductData.findByIdAndRemove(id) 
    .then(()=>{
        console.log("Deleted successfully");
        res.status(200).json({id});
    }) 
    .catch((err)=>{
        console.log('product delete failed',err);
    })
}) 

//EDIT
app.get('/edit/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    ProductData.findOne({ _id: id })
        .then(function(product) {
            res.send(product);
        });
});
app.post('/update', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log("reqbody" + req.body);
    var product = {
        _id: req.body.product._id,
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    ProductData.findOne({ _id: product._id })
        .then(function(productreturn) {
            if (!productreturn) {
                return next(new Error('Could not load Document'));
            }
            else {
                var productupdate = new ProductData(product);
                ProductData.findByIdAndUpdate(productupdate._id, productupdate, (er, updated) => {
                console.log("updated" + updated);
                });
            }
        });
});

//PORT
app.listen(3000, function(){
    console.log("listening to port 3000");
});