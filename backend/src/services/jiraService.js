const axios = require('axios');
const JiraIssueModel = require('../models/JiraIssue');

const fetchJiraIssues = async(req,res) =>{
    const EMAIL = 'madhavilathapaladugu03@gmail.com'; 
    const  API_TOKEN = 'ATATT3xFfGF0tFGPAT5SvtLPJWETSVjNOFkfIEV3MgsGKxGaqP16UrYyCtjMX4BphAMFPHxOSD3F6EAXUkOC7G_qPsHOKRVRDHwMImWD6at0Y6F7hfIi8xDo7Vf_dX1iC1WssLhI5wddXdeLBdeFUN7daq8uKu670GyL7Tg9B9vTmy5xe_W2zBg=4D7E7D39';
    const BASE_URL = 'https://madhavilathasakhamuri.atlassian.net';

    const JQL_QUERY = 'key = "IN-3"'; 

    const encodedToken = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');


    try {

        const response = await axios.get(`${BASE_URL}/rest/api/3/search`, {

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

        console.log('jira issues:', response.data);

       if(issues.length != 0) {
        const jiraData = issues
                         .filter(issue => issue.fields?.project?.name == 'AtlassianIntegrationProject' ) // Filter based on condition
                         .map((issue) => ({
            
            
                issueId: issue.id,
                key: issue.key,
                title: issue.fields.summary,
                description: issue.body,
                status: issue.fields?.status?.name,
                //type: issue.fields?.issuetype?.name,
                projectName: issue.fields?.project?.name,
                linkedIssues: issue.fields.issuelinks.map((link) => link.outwardIssue?.key || link.inwardIssue?.key),
                issueType: issue.fields?.issuetype?.name  
        
        }));
        return jiraData;
        //await JiraIssueModel.insertMany(jiraIssues);

    }
        //res.status(200).json({message: 'Issues fetched successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = { fetchJiraIssues }