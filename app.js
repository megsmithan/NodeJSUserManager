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
    res.render('index', {message: users.usersArray});
});
app.get('/form', (req, res) => {
    res.render('form');
});
app.get('/edit', (req, res) => {
    res.render('edit');
});
app.get('/delete/:id', (req, res) => {
    // console.log(req.params.id);
    toDelete(req.params.id);

});
toDelete = (id) => {
    // let newArray = users.usersArray.filter(x => {
    //     if (x.id != id){
    //         console.log(newArray);
    //     }
    // })
};

app.post('/create', (req, res) => {
    let user = {};
    user.username = req.body.username;
    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;
    user.id = users.usersArray.length + 1 ;
    console.log(user);
    // res.end(`${req.body.username} ${req.body.name} ${req.body.email} ${req.body.age}`);
    fs.readFile('users.json', (err, data) => {
        let json = JSON.parse(data);
        json.usersArray.push(user);
        // console.log(json.usersArray);
        users = json;
        fs.writeFile('users.json', JSON.stringify(json), err => {
            if (err) throw err;
            res.redirect('/');
        });
    });

});
app.post('/update', (req, res) => {
    // res.end(`${req.body.username} ${req.body.name} ${req.body.email} ${req.body.age}`);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

