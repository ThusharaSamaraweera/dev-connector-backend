const express = require('express');
const router = express.Router();

// @router  GET API/posts
// @desc    Test router
// @access  Public

router.get('/', (req, res) => res.send('Posts router'));

module.exports = router;