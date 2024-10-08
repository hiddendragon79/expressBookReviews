const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
      return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
      return true;
  } else {
      return false;
  }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  
  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!doesExist(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn=req.params.isbn;
  
  return res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  const author=req.params.author;
  let keys=Object.keys(books);
  let book_id=0;
  keys.forEach((key)=>{
       if(books[key].author===author)
          book_id=key;

  });

  return res.send(books[book_id]);
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  const title=req.params.title;
  let keys=Object.keys(books);
  let book_id=0;
  keys.forEach((key)=>{
       if(books[key].title===title)
          book_id=key;

  });

  return res.send(books[book_id]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //Write your code here
  let isbn=req.params.isbn;
  
  return res.send(books[isbn]);
});

module.exports.general = public_users;
