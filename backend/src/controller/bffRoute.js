//const getJiraIssuesFromDb = require('./utilController');   
//const AggregatedData = require('../utilModel');

//const AggregatedData = require('./utilModel');

//const router = require('express').Router();

//router.get('/',async (req, res) => {
    //try {
       // const data = await AggregatedData.find();
       // res.status(200).json(data);
    //} catch (error) {
      //  res.status(500).json({message: error.message});
    //}
//});

//module.exports = router;

const express = require('express');
const JiraData = require('../models/JiraIssue');
const BitbucketData = require('../models/bitBucket');
const JsmData = require('../models/jsm');
const { fetchAndSaveData } = require('../services/dataService');

const router = express.Router();

// Trigger data fetch and save
router.get('/sync-data', async (req, res) => {
    console.log('Sync-data endpoint hit');
  try {
    const data = await fetchAndSaveData();
    if (!data) {
        return res.status(404).json({ error: 'Data not found' }); // Use `return`
      }
 
  const [savedJiraData, savedBitbucketData, savedJsmData] = await Promise.all([
    JiraData.find(),
    BitbucketData.find(),
    JsmData.find(),
  ]);


  const manipulatedData={
    jira:savedJiraData,
    bitbucket:savedBitbucketData,
    jsm:savedJsmData
  };
//Step 4: Data manipulation
// const manipulatedData = {
//     jira: savedJiraData.map((issue) => ({
//       id: issue.issueId,
//       title: issue.title, // Example manipulation: Capitalize summary
//       projectName: issue.projectName,
//     })),
//     bitbucket: savedBitbucketData.map((pr) => ({
//       id: pr.prId,
//       title: pr.title.toLowerCase(), // Example manipulation: Lowercase title
//       prStatus: pr.prstatus,
//     })),
//     jsm: savedJsmData.map((ticket) => ({
//       id: ticket.ticketId,
//       description: ticket.description,
//       priority: ticket.priority,
//     })),
//   };
const integratedData =[];
if(savedJiraData.length > 0)
{
    savedJiraData.forEach((issue)=>{
        const plainIssue = issue.toObject();
        const updatedIssue = { ...plainIssue };

        const pullRequest = savedBitbucketData?.find((pr) => pr.title.includes(plainIssue.key));

        updatedIssue.prId = pullRequest ? pullRequest.prId: null;
        updatedIssue.prTitle = pullRequest? pullRequest.title:null;
        
        //const jsmLinkedIssues = savedJsmData?.find((ticket) => ticket.description.includes(issue.title));
        integratedData.push(updatedIssue);

    })

}



  res.json({ success: true, data: integratedData });
  } catch (error) {
    res.status(500).json({ message: 'Error synchronizing data', error });
  }
});

// // Fetch Jira data
// router.get('/jira', async (req, res) => {
//   const jiraData = await JiraData.find();
//   res.status(200).json(jiraData);
// });

// // Fetch Bitbucket data
// router.get('/bitbucket', async (req, res) => {
//   const bitbucketData = await BitbucketData.find();
//   res.status(200).json(bitbucketData);
// });

// // Fetch JSM data
// router.get('/jsm', async (req, res) => {
//   const jsmData = await JsmData.find();
//   res.status(200).json(jsmData);
// });

module.exports = router;
