const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path');


// statically serve everything in the build folder on the route '/build'

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
}
// serve index.html on the route '/'
app.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../web/public/index.html'))
);

app.listen(port, (_, __) => {
  console.log(`listening on port ${port}`);
}); // listens on port 3000 -> http://localhost:3000/
