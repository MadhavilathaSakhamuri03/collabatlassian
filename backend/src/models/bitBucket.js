const mongoose = require('mongoose');

const bitBucketPRsSchema = new mongoose.Schema({ 
    
    id: String,
    prId: String,
    title: String,
    prDescription: String,
    prstatus: String,
   
 });

 module.exports = mongoose.model( 'BitBucketPRs', bitBucketPRsSchema);