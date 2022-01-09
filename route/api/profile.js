const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @router  GET API/profile/me
// @desc    Get current users proflie
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate(
      'user',         
      ['name', 'avatar']    // get these from user
    )

    if(!profile) {
      return res.status(400).json({msg: 'There is no proflie for this user'});
    }

    res.json(profile);

  }  catch(err) {
    console.error(err.message) ;
    res.status(500).send('Server Error');
  }
});

// @router  GET API/profile
// @desc    Create or update user profile
// @access  Private

router.post('/', 
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ]
  ],
   async (req, res) => {
    const errrors = validationResult(req);
    if(!errrors.isEmpty()){
      return res.status(400).json({errors: errrors.array});
    }

    // destructure the request
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio= bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    console.log(profileFields.skills);
    res.send('hi');
  }
);

module.exports = router;