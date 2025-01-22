const express = require('express');
const { fetchJiraIssues } = require('../controllers/jiraController');
const router = express.Router();

router.get('/', fetchJiraIssues);


module.exports = router;


