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
  res.json([{ name: 'item1' }, { name: 'item2' }]);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
