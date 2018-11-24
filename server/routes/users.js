const passport = require('../config/passport');
const passportSignin = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const router = require('express-promise-router')();
const usersController = require('../controllers/usersController');

router.get('/get/:id', passportJWT, usersController.get);

router.post('/register', usersController.register);

router.post('/login', passportSignin, usersController.login);

module.exports = router;