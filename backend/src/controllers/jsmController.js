
const axios = require('axios');

const JSMModel = require('../models/jsm');

const fetchJSMIssues =async(req,res) =>{
   
   const EMAIL = 'madhavilathapaladugu03@gmail.com'; 
   const  API_TOKEN = 'ATATT3xFfGF0x01kKVCzFkbTdL4Eu8cRkljeae7mLIeEDs0YpdDLs82igIaFItSx8BsMkcze_pkp2bhw5ZySvJh889L2qV1kI89SvV22nvgADBkGnBWCrqf9RzwxcSFPrQqj11I05dUMkHytV2-if7gOKxKrAbehQJ9MstIVp0sYK6LzaMAa5lk=F02DCC63';
   const BASE_URL = 'https://madhavilathasakhamuri.atlassian.net';
   const encodedToken = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');

    try {

        const response = await axios.get(`${BASE_URL}/rest/servicedeskapi/servicedesk`, {
    
     headers: {
         Authorization: `Basic ${encodedToken}`,

         'Content-Type': 'application/json',
     },
   });
        const issues = response.data.values;

       
       if(issues.length != 0) {
        const jsmIssues = issues
                            .map((issue) => {
            
            return {
                jsmIssueId: issue.id,
                projectId: issue.projectId,
                projectKey: issue.projectKey,
                
            };
        
        });
        
        await JSMModel.insertMany(jsmIssues);

    }
        res.status(200).json({message: ' jsm issues fetched successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = { fetchJSMIssues};
