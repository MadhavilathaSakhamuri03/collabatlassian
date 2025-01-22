const express = require('express');
const { fetchBitBucketPullRequests } = require('../controllers/bitBucketController');
const router = express.Router();

router.get('/', fetchBitBucketPullRequests);


module.exports = router;


