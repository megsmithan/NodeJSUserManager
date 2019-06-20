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
    res.render('index', {message: users.users});
});
app.get('/form', (req, res) => {
    res.render('form');
});
app.get('/edit', (req, res) => {
    res.render('edit');
});

app.post('/create', (req, res) => {
    console.log(req.body);
    saveUser(req.body);
    // res.end(`${req.body.username} ${req.body.name} ${req.body.email} ${req.body.age}`);
    res.redirect('/');
});
app.post('/update', (req, res) => {
    saveUser(res);
    // res.end(`${req.body.username} ${req.body.name} ${req.body.email} ${req.body.age}`);
});

saveUser = (newUser) => {
    // const userInfo = JSON.stringify(newUser);
    // fs.writeFileSync('users.json', userInfo, (err) => {
    //     if (err) throw err;
    // } );
    fs.readFile('users.json', (err, data) => {
        let json = JSON.parse(data);
        json.users.push(newUser);
        // console.log(json);
        fs.writeFile('users.json', JSON.stringify(json), err => {
            if (err) throw err;
        })
    })
};

app.listen(3000, () => {
    console.log('listening on port 3000');
});

