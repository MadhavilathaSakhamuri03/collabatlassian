

const express = require('express');
const JiraData = require('../models/JiraIssue');
const BitbucketData = require('../models/bitBucket');
const JsmData = require('../models/jsm');
const { fetchAndSaveData } = require('../services/dataService');

const router = express.Router();

router.get('/sync-data', async (req, res) => {
    console.log('Sync-data endpoint hit');
  try {
    const data = await fetchAndSaveData();
    if (!data) {
        return res.status(404).json({ error: 'Data not found' }); 
      }
 
  const [savedJiraData, savedBitbucketData, savedJsmData] = await Promise.all([
    JiraData.find(),
    BitbucketData.find(),
    JsmData.find(),
  ]);


  
const integratedData =[];
if(savedJiraData.length > 0)
{
    savedJiraData.forEach((issue)=>{
        const plainIssue = issue.toObject();
        const updatedIssue = { ...plainIssue };

        const pullRequest = savedBitbucketData?.find((pr) => pr.title.includes(plainIssue.key)||pr.prDescription.includes(plainIssue.key));

        updatedIssue.prId = pullRequest ? pullRequest.prId: null;
        updatedIssue.prTitle = pullRequest? pullRequest.title:null;
        
        integratedData.push(updatedIssue);

    })

}


  res.json({ success: true, data: integratedData });
  } catch (error) {
    res.status(500).json({ message: 'Error synchronizing data', error });
  }
});

module.exports = router;
