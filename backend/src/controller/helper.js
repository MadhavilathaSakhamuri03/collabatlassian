const JiraData = require('../models/JiraIssue');
const BitbucketData = require('../models/bitBucket');
const JsmData = require('../models/jsm');
const LoaderLog = require('../models/loaderLogs');

const { ISSUE_TYPES, ISSUE_STATUS } = require("../configuration");

// ✅ Fetch the latest timestamp
async function getLatestTimestamp() {
    const latestLoaderLog = await LoaderLog.findOne().sort({ loaderStartDate: -1 }).exec();
    return latestLoaderLog?.loaderStartDate || null;
}

// ✅ Fetch Jira Data based on timestamp
async function getJiraDataByTimestamp(timestamp, limit = 50) {
    return JiraData.find({ "applicationMetadata.loadTimestamp": timestamp })
        .sort({ _id: -1 })
        .limit(limit)
        .lean();
}

// ✅ Fetch Bitbucket Data based on timestamp
async function getBitbucketDataByTimestamp(timestamp, limit = 50) {
    return BitbucketData.find({ "applicationMetadata.loadTimestamp": timestamp })
        .sort({ _id: -1 })
        .limit(limit)
        .lean();
}

// ✅ Process Jira and Bitbucket Data to Integrate PRs
function integrateJiraWithPRs(jiraData, bitbucketData) {
    return jiraData.map(issue => {
        const plainIssue = issue.systemMetadata;
        const updatedIssue = { ...plainIssue };

        // Find matching PR
        const pullRequest = bitbucketData.find(pr => 
            pr.systemMetadata.title.includes(plainIssue.key) || 
            pr.systemMetadata.prDescription.includes(plainIssue.key)
        );

        updatedIssue.prId = pullRequest ? pullRequest.systemMetadata.prId : null;
        updatedIssue.prTitle = pullRequest ? pullRequest.systemMetadata.title : null;

        return updatedIssue;
    });
}

// ✅ Process Sprint Data Summary

const getSprintSummary = (jiraData) => {
    const sprintSummaryMap = [];

    jiraData.forEach((issue) => {
        issue.systemMetadata?.sprintData?.forEach((sprint) => {
            const sprintId = sprint.id;

            if(sprint.state === ISSUE_STATUS.ACTIVE || sprint.state === ISSUE_STATUS.FUTURE) {
            // Find existing sprint entry in the array
            let sprintInfo = sprintSummaryMap.find((s) => s.sprintId === sprintId);

            if (!sprintInfo) {
                sprintInfo = {
                    sprintId,
                    sprintName: sprint.name,
                    startDate: sprint.startDate,
                    endDate: sprint.endDate,
                    issueCount: 0,
                    storyCount: 0,
                    bugCount: 0,
                    subtaskCount: 0,
                };
                sprintSummaryMap.push(sprintInfo);
            }

            const issueType = issue.systemMetadata?.issueType;

            sprintInfo.issueCount += 1;
            if (issueType === ISSUE_TYPES.STORY) sprintInfo.storyCount += 1;
            if (issueType === ISSUE_TYPES.BUG) sprintInfo.bugCount += 1;
            if (issueType === ISSUE_TYPES.SUBTASK) sprintInfo.subtaskCount += 1;
        }
        });
    
    });

    return sprintSummaryMap;
};


// ✅ Process Issue Data Summary
const getIssueSummary = (jiraData, filterByIssueType = null) => {
    return jiraData
        .map((issue) => {
            const issueData = issue.systemMetadata;
            if (!issueData) return null; // Skip if no metadata available

            if (!filterByIssueType || issueData.issueType === filterByIssueType) {
                let sprintData =issueData.sprintData?.find(
                    (sprint) => sprint.state === ISSUE_STATUS.ACTIVE || sprint.state === ISSUE_STATUS.FUTURE
                );
                return {
                    issueId: issueData.issueId,
                    issueType: issueData.issueType,
                    issueTitle: issueData.title,
                    issueStatus: issueData.statusData?.key,
                    assignee: issueData.assigneeData?.displayName,
                    issueKey: issueData.key,
                    sprintName: sprintData?.name || "Backlog",
                    sprintId : sprintData?.id
                };
            }
            return null; // Skip if not matching the filter
        })
        .filter(Boolean); // Remove null values
};


const getBugsSummary = (jiraData) => {
    return jiraData
        .map((issue) => {
            const issueData = issue.systemMetadata;
            if (!issueData || issueData.issueType !== ISSUE_TYPES.bug) return null; // Skip if not a Bug

            return {
                issueId: issueData.issueId,
                issueType: issueData.issueType,
                issueTitle: issueData.title,
                issueStatus: issueData.statusData?.key,
                assignee: issueData.assigneeData?.displayName,
                issueKey: issueData.key,
                sprintName: issueData.sprintData?.find(
                    (sprint) => sprint.state === ISSUE_STATUS.ACTIVE || sprint.state === ISSUE_STATUS.FUTURE
                )?.name || "Backlog",
            };
        })
        .filter(Boolean); // Remove null values
};


module.exports = {
    getLatestTimestamp,
    getJiraDataByTimestamp,
    getBitbucketDataByTimestamp,
    integrateJiraWithPRs,
    getSprintSummary,
    getIssueSummary,
    getBugsSummary,
};
