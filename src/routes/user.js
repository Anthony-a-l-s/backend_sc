const express = require('express');
const router = express.Router();

const UserControler = require('../controlers/user');

router.post('/user-create', UserControler.create);
router.post('/login', UserControler.login);
router.get('/user/:token', UserControler.findByToken);

module.exports = router;