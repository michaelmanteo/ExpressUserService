const router = require('express-promise-router')();
const usersController = require('../controllers/usersController');

router.get('/get', usersController.get);

module.exports = router;