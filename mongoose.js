const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect(
    "mongodb+srv://arend:mydummypassword@refresher-cluster0.mzw6z.mongodb.net/product_test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log("connection created");
    }).catch(() => {
        console.log("error connecting");
    });


const createProduct = async (req, res, next) =>{
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })
    const result = await createdProduct.save();

    res.json(result);
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();

    res.json({products});
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;