const axios = require('axios');
const JiraIssueModel = require('../models/JiraIssue');
require('dotenv').config();


const fetchJiraIssues = async(loaderLogstartTime) =>{
    
    const encodedToken = Buffer.from(`${process.env.EMAIL}:${process.env.API_TOKEN}`).toString('base64');

    try {

        const response = await axios.get(`${process.env.BASE_URL}/rest/api/3/search`, {

       params: {
           
               //jql: JQL_QUERY,
               // fields: 'id,key,self,status,fields,project,summary,issuelinks',
                maxResults: 50, // Limit the number of issues returned
               },
           
            headers: {
                Authorization: `Basic ${encodedToken}`,

                'Content-Type': 'application/json',
            },
          });
        const issues = response.data.issues;

        //console.log('jira issues:', response.data.issues);

       if(issues.length != 0) {
        const jiraData = issues
                         .filter(issue => issue.fields?.project?.name == 'AtlassianIntegrationProject' ) // Filter based on condition
                         .map((issue) => ({
            
            
       applicationMetadata: {
            workspaceId:"12345",
            loadTimestamp:loaderLogstartTime

                            },

        systemMetadata:  {
            issueId: issue.id,
            key: issue.key,
            title: issue.fields.summary,
            description: issue.body,
            status: issue.fields?.status?.name,
            projectName: issue.fields?.project?.name,
            linkedIssues: issue.fields.issuelinks.map((link) => link.outwardIssue?.key || link.inwardIssue?.key),
            issueType: issue.fields?.issuetype?.name ,
            issueData :issue.fields?.issuetype  ,
            sprintData : issue.fields?.customfield_10020,
            assigneeData : issue.fields?.assignee,
            statusData : issue.fields?.status?.statusCategory,
            subtaskDetails : issue.fields?.subtasks,
             }
       
       
            }));
        return jiraData;

    }
        
    } catch (error) {
        console.log('Error fetching Jira issues:', error.response?.data || error)
        throw error;
    }
}
module.exports = { fetchJiraIssues }