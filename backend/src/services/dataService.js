const JiraData = require('../models/JiraIssue');
const BitbucketData = require('../models/bitBucket');
const JsmData = require('../models/jsm');

//const { fetchJiraIssues, fetchBitbucketPRs, fetchJsmRequests } = require('./externalApiService');

const { fetchBitbucketPRs } = require('./bitBucketService');
const {fetchJiraIssues} = require('./jiraService');
const { fetchJsmRequests } = require('./jsmService');

const fetchAndSaveData = async () => {
  try {
    // Fetch data from APIs
    const [jiraData, bitbucketData, jsmData] = await Promise.all([
        fetchJiraIssues(),
      fetchBitbucketPRs(),
      fetchJsmRequests(),
    ]);

    // Save Jira data
    await JiraData.deleteMany();
    await JiraData.insertMany(jiraData);

    // Save Bitbucket data
    await BitbucketData.deleteMany();
    await BitbucketData.insertMany(bitbucketData);

    // Save JSM data
    await JsmData.deleteMany();
    await JsmData.insertMany(jsmData);

    return { success: true };
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    throw error;
  }
};

module.exports = { fetchAndSaveData };
