const express = require('express');
const router = express.Router();


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const User = require('../../models/User');


// @router         GET api/auth
// @descreption    Test route
// @access         Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
);


// @router         POST api/auth
// @descreption    Authenticate user & get token
// @access         Public
router.post('/', [
    [
        check('email', 'Please include a valid email').isEmail(),
        // password must be at least 5 chars long
        check('password', 'Password is required').exists()
    ]
],

    async (req, res) => {
        // console.log(req.body);

        const { email, password } = req.body;

        try {

            // See if not user exists
            let user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Matching the password between plain & encrypted(password)
            const isMatch = bcrypt.compare(password, user.password);
            console.log(isMatch);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

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