
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://arend:mydummypassword@refresher-cluster0.mzw6z.mongodb.net/product_test?retryWrites=true&w=majority";


const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('products').insertOne(newProduct);
  } catch (error) {
    console.log('error connecting');
    return res.json({ message: 'Could not store data.' });
  } finally {
    await client.close();
  }

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {

  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection('products').find().toArray();
  } catch (error) {
    console.log('error getting data');
    return res.json({ message: 'Could not get data.' });
  } finally {
    await client.close();
  }
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;

