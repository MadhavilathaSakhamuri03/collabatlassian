const express = require('express');
const { fetchJSMIssues } = require('../services/jsmService');
const router = express.Router();

router.get('/', fetchJSMIssues);


module.exports = router;
