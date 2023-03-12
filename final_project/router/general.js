const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//   ------------Task 6----------
const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}
// User Sign up
public_users.post("/register", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "Customer successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "Customer already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register Customer." });
});


// ----------Task 1 ---------------
// Get the book list available in the shop  
public_users.get('/', function (req, res) {
    //Write your code here
    return res.status(200).json(books);
});

// ------------Task-10-----------
// Get the book list available in the shop using async await
public_users.get('/', async (req, res) => {
    //Write your code here
    return await res.status(200).json(books);
});


// ------------Task -2--------------
// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const { isbn } = req.params
    const getBooks = Object.keys(books)

    let mybook = getBooks.find((book) => book === isbn);
    let getBooksByISBN = books[mybook]
    if (getBooksByISBN.length !== 0) {
        res.status(200).json(getBooksByISBN)
    } else {
        res.status(400).json({ message: "No Book found" })

    }
});

// -----------------Task 11-------------------------------
// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res)=> {
    const { isbn } = req.params
    const getBooks = await Object.keys(books)

    let mybook = await getBooks.find((book) => book === isbn);
    let getBooksByISBN = books[mybook]
    if (getBooksByISBN.length !== 0) {
        return res.status(200).json(getBooksByISBN)
    } else {
        return res.status(400).json({ message: "No Book found" })

    }
});
// ----------------Task-3-----------------
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const { author } = req.params
    const getBooks = Object.values(books)

    let getBookbyAuthor = getBooks.find((book) => book.author === author);
    if (getBookbyAuthor) {
        res.status(200).json(getBookbyAuthor)
    } else {
        res.status(400).json({ message: "No Book found" })

    }
});


// -------------Task -12------------------
public_users.get('/author/:author', async(req, res) => {
    const { author } = req.params
    const getBooks = Object.values(books)

    let getBookbyAuthor = await getBooks.find((book) => book.author === author);
    if (getBookbyAuthor) {
        return res.status(200).json(getBookbyAuthor)
    } else {
        return res.status(400).json({ message: "No Book found" })

    }
});


// --------------Task -4 -----------------------
// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const { title } = req.params
    const getBooks = Object.values(books)

    let getBookbyTitle = getBooks.find((book) => book.title === title);
    if (getBookbyTitle) {
        res.status(200).json(getBookbyTitle)
    } else {
        res.status(400).json({ message: "No Book found" })

    }
});

//------------- Task 13---------------------

public_users.get('/title/:title', async (req, res)=> {
    const { title } = req.params
    const getBooks = Object.values(books)

    let getBookbyTitle = await getBooks.find((book) => book.title === title);
    if (getBookbyTitle) {
        res.status(200).json(getBookbyTitle)
    } else {
        res.status(400).json({ message: "No Book found" })

    }
});

// -----------------Task-5------------------
//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const { isbn } = req.params
    const getBooks = Object.keys(books)

    let mybook = getBooks.find((book) => book === isbn);
    let getBookReviewByISBN = books[mybook].reviews

    res.status(200).json(getBookReviewByISBN)

});

module.exports.general = public_users;
