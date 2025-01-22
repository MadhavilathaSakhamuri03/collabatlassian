const axios = require('axios');
const JiraIssueModel = require('../models/JiraIssue');
const fetchJiraIssues =async(req,res) =>{
    const EMAIL = 'madhavilathapaladugu03@gmail.com'; 
    const  API_TOKEN = 'ATATT3xFfGF0x01kKVCzFkbTdL4Eu8cRkljeae7mLIeEDs0YpdDLs82igIaFItSx8BsMkcze_pkp2bhw5ZySvJh889L2qV1kI89SvV22nvgADBkGnBWCrqf9RzwxcSFPrQqj11I05dUMkHytV2-if7gOKxKrAbehQJ9MstIVp0sYK6LzaMAa5lk=F02DCC63';
    const BASE_URL = 'https://madhavilathasakhamuri.atlassian.net';

    const JQL_QUERY = 'key = "IN-3"'; 

    const encodedToken = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');


    try {

        const response = await axios.get(`${BASE_URL}/rest/api/3/search`, {

       params: {
           
               //jql: JQL_QUERY,
                fields: 'id,key,self,status,fields,project,summary',
                maxResults: 50, // Limit the number of issues returned
               },
           
            headers: {
                Authorization: `Basic ${encodedToken}`,

                'Content-Type': 'application/json',
            },
          });
        const issues = response.data.issues;

       

       if(issues.length != 0) {
        const jiraIssues = issues
                         .filter(issue => issue.fields?.project?.name == 'IntegrationProjectPoc' ) // Filter based on condition
                         .map((issue) => {
            
            return {
                issueId: issue.id,
                title: issue.fields.summary,
                description: issue.body,
                status: issue.fields?.status?.name,
                type: issue.fields?.issuetype?.name,
               projectName: issue.fields?.project?.name,
            };
        
        });
        
        await JiraIssueModel.insertMany(jiraIssues);

    }
        res.status(200).json({message: 'Issues fetched successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = { fetchJiraIssues};
