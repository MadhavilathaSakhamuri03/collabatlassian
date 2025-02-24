const mongoose = require('mongoose');

const bitBucketPRsSchema = new mongoose.Schema({ 
    
    id: String,
    // prId: String,
    // title: String,
    // prDescription: String,
    // prstatus: String,
    systemMetadata:mongoose.Schema.Types.Mixed,
    applicationMetadata:mongoose.Schema.Types.Mixed
 });

 module.exports = mongoose.model( 'BitBucketPRs', bitBucketPRsSchema);