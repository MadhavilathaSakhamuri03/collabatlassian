const axios = require('axios');
const BitBucketModel = require('../models/bitBucket');
const fetchBitbucketPRs = async (loaderLogstartTime) => {
require('dotenv').config();

  const url = `https://api.bitbucket.org/2.0/repositories/${process.env.workspace}/${process.env.repoSlug}/pullrequests`;

  try {
    
    const response = await axios.get(url, {
      auth: {
        username:process.env.BitBucketUsername,
        password: process.env.AppPassword,
      },
    });
    const pullrequests = response.data.values;


    if(pullrequests.length != 0) {
      const bitbucketData = pullrequests .map((pullrequest) => ({
                            
              applicationMetadata: {
                          workspaceId:"12345",
                          loadTimestamp:loaderLogstartTime
                  
                              },
              systemMetadata:  {
                          prId: pullrequest.id,
                          title: pullrequest.title,
                          prDescription: pullrequest.description,
                          prstatus: pullrequest.state
                                
                          }


                            }));
      return bitbucketData;
  }

  } catch (error) {
    console.error('Error fetching pull requests:', error.response?.data || error.message);
  }
};

module.exports = { fetchBitbucketPRs };
