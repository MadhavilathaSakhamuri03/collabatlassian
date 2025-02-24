const mongoose = require('mongoose');

const jiraIssueSchema = new mongoose.Schema({ 
    
    id: String,
   
    systemMetadata:mongoose.Schema.Types.Mixed,
    applicationMetadata:mongoose.Schema.Types.Mixed

 });

 module.exports = mongoose.model( 'JiraIssue', jiraIssueSchema);