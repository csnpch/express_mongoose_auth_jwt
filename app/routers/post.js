const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('<h1>this router /post</h1>');
});


module.exports = router;