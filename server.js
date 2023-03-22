const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const router = require('./router');

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

//load static assests
app.use('/static', express.static(path.join(__dirname, 'public')))
// using background image

app.use('/assests', express.static(path.join(__dirname, 'public/assests')))

//session
app.use(session({
    secret: 'secret',// '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}))

app.use('/route', router);
//home route

app.get('/', (req, res) => {
    res.render('base', { titl: "Login System" });
})

app.listen(port, () => { console.log("Listening to the server on http://localhost:3000") })