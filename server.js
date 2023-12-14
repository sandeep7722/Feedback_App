// server.js


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const demoRoutes = require('./routes/demoRoutes');
const authRoutes = require('./routes/authRoutes');
const visitRoutes = require('./routes/visitRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://livinglabsicets:Infy123%40@infyfeedback.jbtyfln.mongodb.net/infyFeedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Mount routes
app.use('/api/admin', adminRoutes);//done
app.use('/api/demo', demoRoutes);//done
app.use('/api/auth', authRoutes);//done
app.use('/api/visit', visitRoutes);//done
app.use('/api/feedback', feedbackRoutes);//done



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
