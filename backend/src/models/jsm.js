const mongoose = require('mongoose');

const jsmIssueSchema = new mongoose.Schema({ 
    
    id: String,
    jsmIssueId: String,
    projectId: String, 
    projectKey: String,
    
 });

 module.exports = mongoose.model( 'jsmIssue', jsmIssueSchema);