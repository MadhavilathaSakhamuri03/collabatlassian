const JIRAController = require('../controllers/jiraController');
const BitBucketController = require('../controllers/bitBucketController');

module.exports = {    getJIRAIssues: JIRAController.fetchJiraIssues,
    getBitBucketPullRequests: BitBucketController.getPRsFromBitBucket};

