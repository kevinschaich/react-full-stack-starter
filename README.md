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

[Install MongoDB](https://docs.mongodb.com/manual/installation/) if you haven't already. Mac users can run the following:

`brew install mongodb`

Run the following in the root directory of the repository:

`npm install --save mongodb`

In the top of `server.js`, add the following lines to import Mongo and set the database URI:

```javascript
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database-name-here';
```

Near the bottom of `server.js`, modify the `/api` route to return data dynamically from your DB:

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

In `client/src/App.js`, update your render method with the field names of top-level items in your MongoDB database.

For example, if your stored objects in Mongo look like the following:

```json
[
  {name: `Person1`, age: 38},
  {name: `Person2`, age: 27},
]
```

You would change the mapping to:

```jsx
{this.state.items.map((item, i) => (<h1 key={i}>{item.your-field-name-here}</h1>))}
```

Run the server using `npm start` -- you should see items from your DB being populated on the page!

# Contributing/Pull Requests

Please feel free to submit issues/pull requests! I welcome any corrections or suggestions that could make the repository better for others to use and build off of as well.
