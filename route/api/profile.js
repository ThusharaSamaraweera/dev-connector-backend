const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @router  GET API/profile
// @desc    Get current users proflie
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate(
      'user',
      ['name', 'avatar']
    )

    if(!profile) {
      return res.status(400).json({msg: 'There is no proflie for this user'});
    }

    res.json(profile);

  } catch(err) {
    console.error(err.message) ;
    res.status(500).send('Server Error');
  }
});

module.exports = router;