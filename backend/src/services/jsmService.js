
const axios = require('axios');

const JSMModel = require('../models/jsm');

const fetchJsmRequests =async(req,res) =>{
   
   const EMAIL = 'madhavilathapaladugu03@gmail.com'; 
   const  API_TOKEN = 'ATATT3xFfGF0tFGPAT5SvtLPJWETSVjNOFkfIEV3MgsGKxGaqP16UrYyCtjMX4BphAMFPHxOSD3F6EAXUkOC7G_qPsHOKRVRDHwMImWD6at0Y6F7hfIi8xDo7Vf_dX1iC1WssLhI5wddXdeLBdeFUN7daq8uKu670GyL7Tg9B9vTmy5xe_W2zBg=4D7E7D39';
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
        console.log('jsm:', response.data.values);

       
       if(issues.length != 0) {
        const jsmData = issues
                            .map((issue) => ({
            
                jsmIssueId: issue.id,
                projectId: issue.projectId,
                projectKey: issue.projectKey,
                
            
        }));
        return jsmData;
       // await JSMModel.insertMany(jsmIssues);

    }
        //res.status(200).json({message: ' jsm issues fetched successfully'});
    } catch (error) {
        //res.status(500).json({message: error.message});
    }
}
module.exports = { fetchJsmRequests };
