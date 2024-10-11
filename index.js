const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// add an item to the cart
function addItemToCart(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseFloat(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseFloat(req.query.quantity);
  let result = addItemToCart(cart, productId, name, price, quantity);
  res.json(result);
});

// edit quantity of an item in the cart
function editItemInCart(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseFloat(req.query.productId);
  let quantity = parseFloat(req.query.quantity);
  let result = editItemInCart(cart, productId, quantity);
  res.json(result);
});

// delete an item from the cart
function deleteItemInCart(cart, productId) {
  return cart.filter((ele) => ele.productId !== productId);
}
app.get('/cart/delete', (req, res) => {
  let productId = parseFloat(req.query.productId);
  let result = deleteItemInCart(cart, productId);
  cart = result;
  res.json(result);
});

// read items in the cart
app.get('/cart', (req, res) => {
  res.json(cart);
});

// calculate total quantity of items in the cart
function totalQuantityofItemsInCart(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }
  return total;
}
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = totalQuantityofItemsInCart(cart);
  res.json({ totalQuantity });
});

// calculate total price of items in the cart
function totalPriceOfItemsInCart(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
}
app.get('/cart/total-price', (req, res) => {
  let totalPrice = totalPriceOfItemsInCart(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
