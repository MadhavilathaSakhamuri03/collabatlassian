
const axios = require('axios');

const JSMModel = require('../models/jsm');

const fetchJsmRequests =async(req,res) =>{
   
  
   const encodedToken = Buffer.from(`${process.env.EMAIL}:${process.env.API_TOKEN}`).toString('base64');

    try {

        const response = await axios.get(`${process.env.BASE_URL}/rest/servicedeskapi/servicedesk`, {
    
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
