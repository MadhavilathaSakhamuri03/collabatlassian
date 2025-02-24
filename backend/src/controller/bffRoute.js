const express = require('express');
const { fetchAndSaveData } = require('../services/dataService');

const {
    getLatestTimestamp,
    getJiraDataByTimestamp,
    getBitbucketDataByTimestamp,
    integrateJiraWithPRs,
    getSprintSummary,
    getIssueSummary,
} = require('./helper');

const router = express.Router();

// ✅ Sync Data API
router.get('/sync-data', async (req, res) => {
    console.log('Sync-data endpoint hit');
    try {
        const data = await fetchAndSaveData();
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error in sync-data:', error);
        res.status(500).json({ message: 'Error synchronizing data', error });
    }
});

// ✅ Update Data API
router.get('/update-data', async (req, res) => {
    console.log('update-data endpoint hit');
    try {
        const latestTimestamp = await getLatestTimestamp();
        if (!latestTimestamp) {
            return res.status(404).json({ error: 'No timestamp found' });
        }

        const [jiraData, bitbucketData] = await Promise.all([
            getJiraDataByTimestamp(latestTimestamp),
            getBitbucketDataByTimestamp(latestTimestamp),
        ]);

        const integratedData = integrateJiraWithPRs(jiraData, bitbucketData);
        res.json({ success: true, data: integratedData });

    } catch (error) {
        console.error("Error in update-data route:", error);
        res.status(500).json({ message: 'Error synchronizing data', error });
    }
});

// ✅ Sprint Data API
router.get('/sprint-data', async (req, res) => {
    try {
        const latestTimestamp = await getLatestTimestamp();
        if (!latestTimestamp) return res.status(404).json({ error: 'No timestamp found' });

        const jiraData = await getJiraDataByTimestamp(latestTimestamp);
        const sprintSummary = getSprintSummary(jiraData);

        res.json({ success: true, data: sprintSummary });

        
    } catch (error) {
        console.error('Error fetching Jira sprint data:', error);
        res.status(500).json({ message: 'Error fetching Jira sprint data', error });
    }
});

// ✅ Issue Data API
router.get('/issue-data', async (req, res) => {
    try {
        // const latestTimestamp = await getLatestTimestamp();
        // if (!latestTimestamp) return res.status(404).json({ error: 'No timestamp found' });

        // const jiraData = await getJiraDataByTimestamp(latestTimestamp);
        // const issueSummary = getIssueSummary(jiraData);

        // res.json({ success: true, data: issueSummary });
        const { sprintId, issueType } = req.query; // ✅ Get sprintId and issueType from query params

        const latestTimestamp = await getLatestTimestamp();
        if (!latestTimestamp) return res.status(404).json({ error: 'No timestamp found' });

        const jiraData = await getJiraDataByTimestamp(latestTimestamp);

        let issueSummary = getIssueSummary(jiraData);

        // ✅ If sprintId is provided, filter by sprint
        if (sprintId) {
            issueSummary = issueSummary.filter(issue => issue.sprintId === parseInt(sprintId));
        }

        // ✅ If issueType is "bug", filter for bugs only
        if (issueType === "bug") {
            issueSummary = issueSummary.filter(issue => issue.issueType === "Bug");
        }



        res.json({ success: true, data: issueSummary });


    } catch (error) {
        console.error('Error fetching Jira issue data:', error);
        res.status(500).json({ message: 'Error fetching Jira issue data', error });
    }
});

// ✅ Bugs Data API
router.get('/bugs-data', async (req, res) => {
    try {
      const { sprintId } = req.query;
              const latestTimestamp = await getLatestTimestamp();
        if (!latestTimestamp) return res.status(404).json({ error: 'No timestamp found' });

        const jiraData = await getJiraDataByTimestamp(latestTimestamp);
        let bugSummary = getIssueSummary(jiraData, "Bug");

        
        // ✅ If sprintId is provided, filter by sprint
        if (sprintId) {
          bugSummary = bugSummary.filter(issue => issue.sprintId === parseInt(sprintId));
      }
        res.json({ success: true, data: bugSummary });

    } catch (error) {
        console.error('Error fetching Jira bug data:', error);
        res.status(500).json({ message: 'Error fetching Jira bug data', error });
    }
});

module.exports = router;
