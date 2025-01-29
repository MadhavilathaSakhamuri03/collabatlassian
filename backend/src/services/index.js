const JIRAController = require('./jiraService');
const BitBucketController = require('./bitBucketService');

module.exports = {    getJIRAIssues: JIRAController.fetchJiraIssues,
    getBitBucketPullRequests: BitBucketController.getPRsFromBitBucket};

