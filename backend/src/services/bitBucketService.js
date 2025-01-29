const axios = require('axios');
const BitBucketModel = require('../models/bitBucket');
const fetchBitbucketPRs = async (req, res) => {
  const username = 'integrationprojectpoc-admin';
  const appPassword = 'ATBBtRV2xdaNKmKduzaDDvJyZMK5B7DB1409'; // Ensure this is correct and not expired
  const workspace = 'integrationprojectpoc'; // Verify the workspace ID
  const repoSlug = 'collabatlassian'; // Verify the repository name (slug)

  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repoSlug}/pullrequests`;

  try {
    // API request to fetch pull requests
    const response = await axios.get(url, {
      auth: {
        username,
        password: appPassword,
      },
    });
    const pullrequests = response.data.values;

    console.log('Pull Requests:', response.data);

    if(pullrequests.length != 0) {
      const bitbucketData = pullrequests
                       //.filter(issue => issue.fields?.project?.name == 'IntegrationProjectPoc' ) // Filter based on condition
                       .map((pullrequest) => ({
                   
              prId: pullrequest.id,
              title: pullrequest.title,
              prDescription: pullrequest.description,
              prstatus: pullrequest.state
          
      
      }));
      return bitbucketData;
  }

    // Respond with the pull request data
    //res.status(200).json({
     // message: 'Pull requests fetched successfully',
      //data: response.data,
   // });



  } catch (error) {
    // Improved error handling
    console.error('Error fetching pull requests:', error.response?.data || error.message);

    //res.status(500).json({
     // message: 'Failed to fetch pull requests',
     // error: error.response?.data || error.message,
    //});
  }
};

module.exports = { fetchBitbucketPRs };
