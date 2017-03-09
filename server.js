const express = require('express');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api', (req, res) => {
  // Place code to fetch items from DB here
  res.json([
    {name: 'Person1', age: 38},
    {name: 'Person2', age: 27},
  ]);
});

app.listen(app.get('port'));
