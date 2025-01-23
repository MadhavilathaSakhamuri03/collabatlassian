const axios = require('axios');

const fetchBitBucketPullRequests = async (req, res) => {
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

   
    // Respond with the pull request data
    res.status(200).json({
      message: 'Pull requests fetched successfully',
      data: response.data,
    });
  } catch (error) {
    // Improved error handling
    console.error('Error fetching pull requests:', error.response?.data || error.message);

    res.status(500).json({
      message: 'Failed to fetch pull requests',
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { fetchBitBucketPullRequests };
