const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
const validPassword = require('../lib/passwordUtils').validPassword;


/* pay attantion: this fields must match register/login page
password field name is pw, must match with options obj in passport.js
    or eliminate obj
*/
const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};


const verifyCallback = (username, password, done) => {
    console.log("arrivato qui "+username)
    console.log("arrivato qui "+password)
    User.findOne({ username: username })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}


const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

//it seems that i can put everything inside the object
//as long as i pass the right element into the deserializeUser:
//{"id": user.id, "dt": new Date().toISOString()} is matched by userId.id
passport.serializeUser((user, done) => {
    done(null, {"id": user.id, "dt": new Date().toISOString()} );
});

passport.deserializeUser((userId, done) => {
    User.findById(userId.id)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});


