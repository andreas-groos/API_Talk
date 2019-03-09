const express = require("express"); // * Import express
const bodyParser = require("body-parser"); // * bodyparser to parse the body of POST/PUT
const cors = require("cors"); // * used to deal with CORS
const app = express(); // * Create express instance
const _ = require("lodash");
const port = 4000; // * specify PORT

// * Our user, in a real API those would come from a database (mongoDB, mySQL etc)
let users = [
  { name: "Tom", balance: 100 },
  { name: "Peter", balance: 50 },
  { name: "Emily", balance: 250 }
];

// * Middleware getting called everytime
const Logger = (req, res, next) => {
  const { query, method, headers, originalUrl } = req;
  // console.log("req", req);
  console.log("method : ", method);
  console.log("query  : ", query);
  // console.log("headers", headers);
  // console.log("originalUrl", originalUrl);
  console.log("------------------------------");
  next();
};

// * pass every request to the Logger
app.use(Logger);

// * tell express to use bodyParser
app.use(bodyParser.json());

// * urlencoded({extended: true}) let's us use the body, otherwise we would have to use querystring
app.use(bodyParser.urlencoded({ extended: true }));

// * implement CORS
app.use(cors()); // * allow requests to originate from anywhere
// * restrict access to only come from a certain origin
// app.use(cors({
//   origin: 'http://yourapp.com'
// }));

// * matches every route, every method
app.all("*", (req, res, next) => {
  console.log(new Date());
  next();
});

// * 'root' route, just for checking if server is up and responding
app.get("/", (req, res) => res.send("Everything OK"));

// * Using Regex instead of string allows us to match multiple routes, in this case all methods, /users, /user/1, /usersomethingelse
app.all(/user/, (req, res, next) => {
  let auth = req.headers.authorization;
  // * Check authorization to make sure that only authorized users get access
  if (notAuthorized) {
    // * Reject request
    res.status(401);
  }
  next();
});

// * Out first proper route, GET /users, just returns all the users
app.get("/users", (req, res) => res.send(users));

// * GET with param (:id), returns single user
app.get("/user/:id", (req, res) => {
  let user = users[req.params.id];
  if (user) {
    // * status(200), everything OK
    res.status(200).send(user);
  } else {
    // * status(400), bad request
    res.status(400).json({ error: "No user with this ID" });
  }
});

// * POST, creates new user
app.post("/user", (req, res) => {
  console.log("req.body", req.body);
  let { name, balance } = req.body;
  if (name && balance) {
    // * Add new user to users, in real life you would have a write operation to a database
    users.push({ name, balance });
    console.log("users", users);
    // * return all users and status 200
    res.status(200).send(users);
  } else {
    // * missing parts in body of POST request, send error
    res.status(400).json({ error: "You need to give a name and a balance" });
  }
});

// * PUT, change balance on existing user
app.put("/user/:id", (req, res) => {
  let { balance } = req.body;
  users[req.params.id].balance = balance;
  // * return existing user with new balance, would need update operation to a database
  res.status(200).send(users[req.params.id]);
});

// *  DELETE, delete existing user
app.delete("/user/:id", (req, res) => {
  // * delete user from users array
  users.splice(req.params.id, 1);
  console.log("users", users);
  // * return remaining users
  res.status(200).send(users);
});

app.delete("/", (req, res) =>
  // * 405: Method not allowed
  res.status(405).json({ error: "this route doesnt allow delete" })
);

app.get("/balances", (req, res) => {
  let { query } = req;
  let sortedUsers = users;
  console.log("query", query);
  if (query.sort === "asc") {
    sortedUsers = _.sortBy(users, o => o.balance);
  } else if (query.sort === "desc") {
    sortedUsers = _.sortBy(users, o => o.balance).reverse();
  }
  res.status(200).send(sortedUsers);
});

// * Fallback route is no other route matches
app.get("*", function(req, res) {
  res.send("what???", 404);
});

// * Start server with callback once server is ready
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
