
console.log('Hello World');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const routes = require('./routes/jiraRoute');
const bitBucketRoutes = require('./routes/bitBucketRoute');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Madhavilatha:sakhamuri@cluster0.cq9co.mongodb.net/CollabAtlassian', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
//app.use('/api', routes);
app.use('/api/jira', require('./routes/JiraRoute'));
app.use('/api/bitbucket', bitBucketRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});