const axios = require('axios');
const BitBucketModel = require('../models/bitBucket');
const fetchBitbucketPRs = async (req, res) => {
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

    console.log('Pull Requests:', response.data);

    if(pullrequests.length != 0) {
      const bitbucketData = pullrequests .map((pullrequest) => ({
                             prId: pullrequest.id,
                            title: pullrequest.title,
                            prDescription: pullrequest.description,
                            prstatus: pullrequest.state
          
                            }));
      return bitbucketData;
  }

  } catch (error) {
    console.error('Error fetching pull requests:', error.response?.data || error.message);
  }
};

module.exports = { fetchBitbucketPRs };
