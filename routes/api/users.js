const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// const { check, validationResult } = require('express-validator/check');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');


// @router         POST api/users
// @descreption    Register user
// @access         Public
router.post('/', [
    [
        check('name', 'Name is required')
            .not()
            .isEmail(),
        // username must be an email
        check('email', 'Please include a valid email').isEmail(),
        // password must be at least 5 chars long
        check('password', 'Please enter a password with 6 or more character').isLength({ min: 6 })
    ]
],

    async (req, res) => {
        console.log(req.body);

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {

            // See if user exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User is already exists' }] });
            }
            // ======================================================================

            // Get users gravatar
            const avatar = gravatar.url(email);
            var url = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

            user = new User({
                name,
                email,
                avatar,
                password
            });
            // =======================================================================

            // Encrypt the password using bcrypt
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            // ========================================================================

            // Return jsonwebtoken  
            const payload = { user: { id: user.id, } };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000, },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

            // res.send('User registered');

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

    }
);
module.exports = router;