const router = require('express').Router();
const auth = require('../configs/middleware/auth');


router.use('/user', require('./user'));
router.use('/post', require('./post'));


router.post('/welcome', auth, (req, res) => {
    res.status(200).send('Welcome 🖐');
});


module.exports = router;