const express = require('express');
const gravator = require('gravatar');
const { check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../modules/User');

const router = express.Router();

// @router  POST API/users
// @desc    Register user
// @access  Public

router.post('/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
      // see if user exists
      let user = await User.findOne({email});
      if(user){
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
      }

      // Get users gravatar
      const avator = gravator.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      user = new User({
        name, 
        email,
        avator,
        password
      })
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user : {
          id: user.id
        }
      }
      jwt.sign(
        payload, 
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
          if(err) throw err;
          res.json({token});
        }
      )
 
    }catch(err){
      console.log(err.message);
    }
  }
);

module.exports = router;