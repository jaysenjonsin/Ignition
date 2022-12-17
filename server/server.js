const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();
connectDB();
// statically serve everything in the build folder on the route '/build'

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../dist')));
}

const taskRouter = require('./routes/taskRoutes');
app.use(express.json());
//since our req.body will only contain strings, we will use extended false. if req.body were to contain other datatypes, we would use : true
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', taskRouter);

app.listen(port, (_, __) => {
  console.log(`listening on port ${port}`);
}); // listens on port 3000 -> http://localhost:3000/
