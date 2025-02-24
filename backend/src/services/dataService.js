const JiraData = require('../models/JiraIssue');
const BitbucketData = require('../models/bitBucket');
const JsmData = require('../models/jsm');
const LoaderLogs = require('../models/loaderLogs');


const { fetchBitbucketPRs } = require('./bitBucketService');
const {fetchJiraIssues} = require('./jiraService');
const { fetchJsmRequests } = require('./jsmService');

const fetchAndSaveData = async () => {
  try {
    // Save loaderLogs data
    const loaderLogstartTime = Math.floor(Date.now() / 1000);
    const loaderLogs = new LoaderLogs({loaderStartDate:loaderLogstartTime});
//await LoaderLogs.insertMany(loaderLogs);



    // Fetch data from APIs
    const [jiraData, bitbucketData, jsmData] = await Promise.all([
        fetchJiraIssues(loaderLogstartTime),
      fetchBitbucketPRs(loaderLogstartTime),
      fetchJsmRequests(),
    ]);

    // Save Jira data
   
    await JiraData.insertMany(jiraData);

    // Save Bitbucket data
 
    await BitbucketData.insertMany(bitbucketData);

    // Save JSM data
  
    await JsmData.insertMany(jsmData);


    loaderLogs.loaderEndDate = Math.floor(Date.now() / 1000);
    await LoaderLogs.insertMany(loaderLogs);


    return { success: true };
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    throw error;
  }
};

module.exports = { fetchAndSaveData };
