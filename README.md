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

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the server running!

# Example DB Connection with MongoDB

#### Install MongoDB

Make sure you have [MongoDB installed](https://docs.mongodb.com/manual/installation/). If you don't have any databases set up, you can run this command to populate a few rows (be sure to change `database-name-here` and `collection-name-here`):

`mongo database-name-here --eval 'db.collection-name-here.insert({"name": "John Doe"}, {"name": "Jane Doe"})'`

Run the following in the **root directory** of the repository:

`npm install --save mongodb`

#### Configure MongoDB

In the top of `server.js`, add the following lines to import Mongo and set the database URI. Be sure to replace `database-name-here` with the name of your database in Mongo.

```javascript
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database-name-here';
```

Now, near the bottom of `server.js`, update the `app.get('/api'...)` route to retrieve data from your DB. Be sure to replace `collection-name-here` with the name of your collection in Mongo.

```javascript
app.get('/api', (req, res) => {
  MongoClient.connect(url).then(db => {
    const cursor = db.collection('collection-name-here')
      .find({})
      .limit(5)
      .toArray()
    .then((data) => {
      res.json(data);
    });
  }).catch(err => {
    console.log(err);
  });
});
```

Your server should be pulling items from the database when it receives a call to `/api`. You can test this by visiting [http://localhost:3001/api](http://localhost:3001/api) and see if the response is displayed properly.

Back on the client side, in `client/src/App.js`, you need to update your `render` method to match the format of objects in MongoDB. For example, if your stored objects in Mongo look like the following:

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
