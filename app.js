const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const productsFilePath = path.join(__dirname, 'data', 'products.json');

const readData = (filePath) => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get('/', (req, res) => {
    res.render('index');
});

// User routes
app.get('/users', (req, res) => {
    const users = readData(usersFilePath);
    res.render('users/index', { users });
});

app.get('/users/add', (req, res) => {
    res.render('users/add');
});

app.post('/users/add', (req, res) => {
    const users = readData(usersFilePath);
    const newUser = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    };
    users.push(newUser);
    writeData(usersFilePath, users);
    res.redirect('/users');
});

app.get('/users/edit/:id', (req, res) => {
    const users = readData(usersFilePath);
    const user = users.find(u => u.id === req.params.id);
    res.render('users/edit', { user });
});

app.post('/users/edit/:id', (req, res) => {
    const users = readData(usersFilePath);
    const userIndex = users.findIndex(u => u.id === req.params.id);
    users[userIndex] = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    };
    writeData(usersFilePath, users);
    res.redirect('/users');
});

app.post('/users/delete/:id', (req, res) => {
    let users = readData(usersFilePath);
    users = users.filter(u => u.id !== req.params.id);
    writeData(usersFilePath, users);
    res.redirect('/users');
});

// Product routes
app.get('/products', (req, res) => {
    const products = readData(productsFilePath);
    res.render('products/index', { products });
});

app.get('/products/add', (req, res) => {
    res.render('products/add');
});

app.post('/products/add', (req, res) => {
    const products = readData(productsFilePath);
    const newProduct = {
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    products.push(newProduct);
    writeData(productsFilePath, products);
    res.redirect('/products');
});

app.get('/products/edit/:id', (req, res) => {
    const products = readData(productsFilePath);
    const product = products.find(p => p.id === req.params.id);
    res.render('products/edit', { product });
});

app.post('/products/edit/:id', (req, res) => {
    const products = readData(productsFilePath);
    const productIndex = products.findIndex(p => p.id === req.params.id);
    products[productIndex] = {
        id: req.params.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    writeData(productsFilePath, products);
    res.redirect('/products');
});

app.post('/products/delete/:id', (req, res) => {
    let products = readData(productsFilePath);
    products = products.filter(p => p.id !== req.params.id);
    writeData(productsFilePath, products);
    res.redirect('/products');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
