import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

app.use(cors("http://127.0.0.1:5173"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  // const userToAdd = req.body;
  // addUser(userToAdd);
  // res.status(200).send(); // Sending a 200 status to indicate success
  console.log("Received POST request to /users");
  console.log("Request body:", req.body);
  
  const userToAdd = req.body;
  addUser(userToAdd);
  
  console.log("User added:", userToAdd);
  console.log("Updated users list:", users["users_list"]);

  res.status(200).send(); // Sending a 200 status to indicate success
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
