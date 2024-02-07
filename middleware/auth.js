const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
       throw {name: 'unauthorized'};
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
       next(error);
    }
}