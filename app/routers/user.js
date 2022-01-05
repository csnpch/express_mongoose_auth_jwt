const router = require('express').Router();
const { check } = require('express-validator');
const controller = require('./../controllers/user');
const auth = require('../configs/middleware/auth');


router.get('/', auth, async (req, res) => {
    res.json(await controller.getUsers());
});


router.post('/register', [
    check('name').not().isEmpty(),
    check('surname').not().isEmpty(),
    check('email').isEmail().not().isEmpty(),
    check('password').not().isEmpty()
],async (req, res) => {
    try {
        req.validate();

        const { body } = req;
        const user = await controller.createNewUser(body); // Create and check user exist in our db
        
        res.status(201).send(user);
    } catch (err) { res.error(err); }
});


router.post('/login', [
    check('email').isEmail().not().isEmpty(),
    check('password').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();

        const { body } = req;
        const user = await controller.checkUserLogin(body);
        req.session.userLogin = user;
        console.log(req.session.userLogin)

        res.status(200).json(user);
    } catch (err) { res.error(err); }
});


router.post('/logout', async (req, res) => {
    try {

        req.session.userLogin = undefined;
        delete req.session.userLogin;
        res.status(200).json({msg: 'logout'})

    } catch (err) { res.error(err); }
});


module.exports = router;