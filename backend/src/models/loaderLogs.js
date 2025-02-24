const mongoose = require('mongoose');
const jsm = require('./jsm');

const loaderLogsSchema = new mongoose.Schema({ 
    
    id: String,
    workspaceId: String,
    loaderStartDate:Number,
    loaderEndDate:Number
      

 });

 module.exports = mongoose.model( 'loaderLogs', loaderLogsSchema);