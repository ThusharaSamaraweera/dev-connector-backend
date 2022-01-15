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

    //Build social object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id});

      if(profile){
        // update
        profile = await Profile.findOneAndUpdate(
          { user : req.user.id },
          { $set: profileFields},
          { new : true}
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      
      await profile.save();
      res.json(profile);

    } catch(err){
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @router GET api/profiles 
// @desc Get all proflies
// @access Public

router.get('/', async( req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

// @router GET api/profile/user/:user_id
// @desc GET profile by user id
// @access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avator']);

    if(!profile) return res.status('400').json('Profile not found');

    res.json(profile);

  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') return res.status('400').json('Profile not found');

    res.status(500).send('Server Error');
  }
})

// @router DELETE api/profile
// @desc Delete user, profile and posts
// @access private

router.delete('/', auth, async (req, res) => {
  try {
    // TODO - Delete posts

    // delete profile
    await Profile.findOneAndRemove({user: req.user.id});

    // delete user
    await User.findOneAndRemove({ _id: req.user.id});
    res.json('User Deleted');

  } catch (err) {
    console.log(err.message);
    res.status('500').send('Server Error');
  }
})

// @router PUT api/profile/experience
// @desc add experience
// @access private

router.put('/experience', 
  [
    auth, 
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ msg: errors.array()});
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
    }

    try {
      const profile = await Profile.findOne({user: req.user.id});

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);

    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
)
module.exports = router;