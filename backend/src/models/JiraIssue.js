const mongoose = require('mongoose');

const jiraIssueSchema = new mongoose.Schema({ 
    
    id: String,
    issueId: String,
    key: String,
    title: String, 
    description: String,
    status: String,
    projectName: String,
    linkedIssues: Array,
    issueType:String

 });

 module.exports = mongoose.model( 'JiraIssue', jiraIssueSchema);