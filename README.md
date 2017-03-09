# React Full-Stack Starter Kit

Full-stack React boilerplate using [`create-react-app`](https://github.com/facebookincubator/create-react-app), [Babel](https://babeljs.io/), [Node.js](https://nodejs.org/en/), and [express](https://expressjs.com/). Plays nicely with DB connectors such as [MongoDB](https://www.npmjs.com/package/mongodb), [Mongoose](https://www.npmjs.com/package/mongoose), [MySQL](https://www.npmjs.com/package/mysql) and many others.

Fully-updated for ES6 syntax.

Loosely Based on [Fullstack React's demo](https://github.com/fullstackreact/food-lookup-demo), just leaned-out. Check out their [blog post](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) for details on how the proxy setup allows a concurrent client/server side.

# Installation/Usage

```bash
git clone https://github.com/kevinschaich/react-full-stack-starter
cd react-full-stack-starter
npm install

cd client
npm install

cd ..
npm start
```

# Example DB Connection with MongoDB

Make sure you have [MongoDB installed](https://docs.mongodb.com/manual/installation/). Run the following in the root directory of the repository:

`npm install --save mongodb`

In the top of `server.js`, add the following lines to import Mongo and set the database URI:

```javascript
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database-name-here';
```

Near the bottom of `server.js`, modify the `/api` route to return data from your DB:

```javascript
app.get('/api', (req, res) => {
  return new Promise((res, rej) => {
    MongoClient.connect(url).then(db => {
      const cursor = db.collection('collection-name-here').findOne();
      
      res(cursor);
    }).catch(err => {
      console.log(err);
    });
  });
});

```

Now, your server should be pulling in items from the database when it receives a call to `/api`. Now, in `client/src/App.js`, you need to update your `render` method to match the format of objects in MongoDB.

For example, if your stored objects in Mongo look like the following:

```json
[
  {"name": "Person1", "age": 38},
  {"name": "Person2", "age": 27},
]
```

You could change the mapping to populate the `name` field of each item on the page like so:

```jsx
  const items = this.state.items.map(
    (item, i) => (<h1 key={i}>{item.name}</h1>)
  );
```

Run the server using `npm start` -- you should see items from your DB being populated on the page!

# Contributing/Pull Requests

Please feel free to submit issues/pull requests! I welcome any corrections or suggestions that could make the repository better for others to use and build off of as well.
