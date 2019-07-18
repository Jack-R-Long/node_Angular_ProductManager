// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
//mongoose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.json());
// MiddleWare: Session and Flash 
var session = require('express-session');
app.use(session({
	secret: 'cam_god',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
const flash = require('express-flash');
app.use(flash());
// static content
// app.use(express.static(path.join(__dirname, './public/dist')));
app.use(express.static( __dirname + '/public/dist/public' ));


// // Get sockets
// const server = app.listen(8000);
// const io = require('socket.io')(server);
// var counter = 0;

// io.on('connection', function (socket) { //2
// 	  //Insert SOCKETS 
// });

// Mongoose Schema users 
var ProductSchema = new mongoose.Schema({
	title: {type: String, required: [true, "Must have title"], minlength: [4, "Title must be longer than 3 characters"]},
	price: {type: Number, required : [true, "Must have price"]},
	url: {type: String, default: ""},
}, {timestamps: true})
mongoose.model('Product', ProductSchema); // We are setting this Schema in our Models as 'Product'
var Product = mongoose.model('Product') // We are retrieving this Schema from our Models, named 'User'

// // ...delete all records of the User Model
// User.deleteMany({}, function(err){
// 	// This code will run when the DB has attempted to remove all matching records to {}
//    })

// root route to render the index.ejs view
//app.get('/')
app.get('/products',(req, res)=>{
	Product.find({}, (err, Products_array)=>{
		if (err) {
			console.log("Error finding Products")
			res.json({message: "Error", error: err})
		}else {
			console.log(Products_array)
			res.json({message: "Success", data: Products_array})
		}
	})
} )
app.get('/products/:id', (req, res)=> {
	Product.findOne({_id: req.params.id}, (err, product_arr)=> {
		if (err) {
			console.log("Error finding product")
			res.json({message: "Error", error: err})
		}else {
			console.log(product_arr)
			res.json({message: "Success", data: product_arr})
		}
	})
})
app.post('/products', (req, res)=>{
	Product.create(req.body, (err, new_product_array)=>{
		if (err) {
			console.log("Error creating product")
			res.json({message: "Error", error: err})	
		}else {
			console.log(new_product_array)
			res.json({message: "Success", data: new_product_array})
		}
	})
})
app.delete('/products/:id', (req, res)=>{
	Product.findByIdAndDelete(req.params.id, (err)=>{
		if (err) {
			console.log("Error deleting product by ID")
			res.json({message: "Error", error: err})	
		} else {
			res.json({message: "Success : deleted product!"})
		}
	})
} )
app.put('/products/:id', (req,res)=> {
	Product.findOneAndUpdate({_id: req.params.id}, req.body,{runValidators: true, new: true}, (err, new_product_arr)=>{
		if (err) {
			console.log("Error updating product by ID")
			res.json({message: "Error", error: err})	
		} else {
			console.log(new_product_arr)
			res.json({message: "Success", data: new_product_arr})
		}
	})
})
// this route will be triggered if any of the routes above did not matchcopy
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
//The 404 Route (ALWAYS Keep this as the last route)
//app.get('*', function(request, response){
	//response.send("404")
//});

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});