
console.log('Hello World');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bitBucketRoutes = require('./routes/bitBucketRoute');
const jsmRoutes = require('./routes/jsmRoute');

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

const cors = require('cors');
app.use(cors());
// Routes
//app.use('/api', routes);
//app.use('/api/jira', require('./routes/JiraRoute'));
//app.use('/api/bitbucket', bitBucketRoutes);
//app.use('/api/jsm', jsmRoutes);

//app.use('/api/jira', require('./controller/bffRoute'));

app.use('/api', require('./controller/bffRoute'));
//app.use('/api', require('./controller/bffRoute'));
app.use('/api/update-date', require('./controller/bffRoute'));


console.log('API routes mounted at /api');

app.get('/', (req, res) => {
    res.send('Backend is running!');
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});