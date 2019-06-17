const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();

let data = fs.readFileSync('users.json');
let users = JSON.parse(data);
// console.log(users);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index', {message: users});
});
app.get('/form', (req, res) => {
    res.render('form');
});
app.get('/edit', (req, res) => {
    res.render('edit', {message: users});
});
app.post('/create', (req, res) => {

    console.log(req.body);
    // fs.writeFile('users.txt');
    res.end(`${req.body.username} ${req.body.name} ${req.body.email} ${req.body.age}`);
});

saveUser = () => {

};

app.listen(3000, () => {
    console.log('listening on port 3000');
});