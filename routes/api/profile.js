const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


// @router         GET api/profile/me
// @descreption    Get current user profile
// @access         Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
            ['name', 'avatar']);
        // console.log(profile);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @router         POST api/profile
// @descreption    Create or Update user profile
// @access         Private

router.post('/', [auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @router         POST api/profile
// @descreption    Get all profile
// @access         Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @router         POST api/profile/user/:user_id
// @descreption    Get profile by user ID
// @access         Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile)
            return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (error) {
        console.error(error.message);

        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @router         DELETE api/profile/
// @descreption    Delete profile, user & post
// @access         Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove posts
        await Post.deleteMany({ user: req.user.id });

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove user
        await User.findOneAndRemove({ _id: req.user.id }).populate('user', ['name', 'avatar']);
        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @router         PUT api/profile/experience
// @descreption    Add profile experience
// @access         Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            if (profile == null) {
                res.json({ msg: "Profile not found please create profile first" });
            }
            else {
                profile.experience.unshift(newExp);

                await profile.save();

                res.json(profile);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);


// @router         DELETE api/profile/experience/:exp_id
// @descreption    Delete experience from profile
// @access         Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove Index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// ===============================
// @router         PUT api/profile/education
// @descreption    Add profile education
// @access         Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            if (profile == null) {
                res.json({ msg: "Profile not found please create profile first" });
            }

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);


// @router         DELETE api/profile/education/:edu_id
// @descreption    Delete education from profile
// @access         Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove Index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @router         GET api/profile/github/:username
// @descreption    Get user repos from Github
// @access         Public
router.get('/github/:username', (req, res) => {
    try {
        const option = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        request(option, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found' });
            }

            res.json(JSON.parse(body));
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;