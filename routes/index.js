const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const passwordUtils = require('../lib/passwordUtils');
const connection = require('../config/database');
const User = connection.models.User;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;
const util = require('util');
const ObjectUtils = require('../lib/myUtils');

//import { seeObjects, seeObjects2 } from './lib/myUtils';

/**
 * -------------- POST ROUTES ----------------
 */

 // TODO
 router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));


 // TODO
 router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.pw);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    var admin = false

    if (req.body.admin) admin=true
    console.log("admin vale ", admin)

    //console.dir("username vale "+req.body)
    //console.log(`${util.inspect(req.body,false,null)}`);
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key))
            console.log(`${key}: ${req.body[key]}`);
    }

    const keys = Object.keys(req.body);
    keys.forEach((key, index) => {
        console.log(`conversione cool ${key}: ${req.body[key]}`);
    });

    for (const [key, value] of Object.entries(req.body)) {
        console.log(`ullala' ${key}: ${value}`);
    }
    
    //console.log("username vale "+req.body.uname)
    //req.body.items.forEach(({id}) => {
    //    console.log(id, " ", req.body.items[id])
    //})
    //ObjectUtils.seeObjects("2ciao", "bello")
    //ObjectUtils.seeObjects2("2ciaolin", "bellolin")

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
        admin: admin
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
 });

 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    /* pay attantion: password field name is pw, must match with options obj in passport.js
       or eliminate obj
    */
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><label for="admin"> Im an admin</label>\
                    <input type="checkbox" id="admin" name="admin" value="1">\
                    </input><br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    res.send('<h1>You made to the route!</h1>');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    res.send('<h1>You made to the admin route!</h1>');
});


// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;