const express = require('express');
const connectDB = require('./config/db');
//Make sure to put dotenv.config before anything that requires process.env. initially had issue because i tried putting connectDB line before dotenv.config
require('dotenv').config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
app.use(express.json());
//since our req.body will only contain strings, we will use extended false. if req.body were to contain other datatypes, we would use : true
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../dist')));
}

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

//catch all route handler
app.use((_, res) => res.status(404).send('page not found'));

//global error handler
app.use((err, _, res, __) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message ? err.message : 'An unknown error occured',
  });
});

app.listen(port, (_, __) => {
  console.log(`Listening on port ${port}`);
});
