const mongoose = require('mongoose');

const bitBucketPRsSchema = new mongoose.Schema({ 
    
    id: String,
   
 });

 module.exports = mongoose.model( 'BitBucketPRs', bitBucketPRsSchema);