const mongoose = require('mongoose');

const jiraIssueSchema = new mongoose.Schema({ 
    
    id: String,
    issueId: String,
    title: String, 
    description: String,
    status: String,
    type: String,
    projectName: String



 });

 module.exports = mongoose.model( 'JiraIssue', jiraIssueSchema);