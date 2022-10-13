module.exports.isAuth = (req, res, next) => {
    /*
    const keys = Object.keys(req);
    keys.forEach((key, index) => {
        console.log(`conv ${key}: ${req.body[key]}`);
    });
    */
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}

module.exports.isAdmin = (req, res, next) => {
    /*
    const keys = Object.keys(req);
    keys.forEach((key, index) => {
        console.log(`conv2 ${key}: ${req.body[key]}`);
    });
    */
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}