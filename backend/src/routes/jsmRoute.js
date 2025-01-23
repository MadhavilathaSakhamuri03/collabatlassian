const express = require('express');
const { fetchJSMIssues } = require('../controllers/jsmController');
const router = express.Router();

router.get('/', fetchJSMIssues);


module.exports = router;
