import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./user-service.js";

dotenv.config();

console.log(process.env);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


const app = express();
const port = 8000;

// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspiring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ]
// };

// const addUser = (user) => {
//   const randomId = Math.random().toString(36).substr(2, 6);
//   user.id = randomId;
//   users["users_list"].push(user);
//   return user;
// };

// const findUserByName = (name) => {
//   return users["users_list"].filter((user) => user["name"] === name);
// };

// const findUserById = (id) => {
//   return users["users_list"].find((user) => user["id"] === id);
// };

app.use(cors("http://127.0.0.1:5173"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userService.getUsers(name, job)
    .then((results) => {
      res.send({ users_list: results });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.findUserById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.error(`Error fetching user with ID ${id}:`, error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
    .then((newUser) => {
      console.log("New user added:", newUser);
      res.status(201).json(newUser); // Send the entire user object, including the ID
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      res.status(500).send("Internal Server Error");
    });
});




// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   if (name !== undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.send(result);
//   } else {
//     res.send(users);
//   }
// });

// app.get("/users/:id", (req, res) => {
//   const id = req.params.id;
//   let result = findUserById(id);
//   if (result === undefined) {
//     res.status(404).send("Resource not found.");
//   } else {
//     res.send(result);
//   }
// });


// app.post("/users", (req, res) => {
//   const userToAdd = req.body;
//   const newUser = addUser(userToAdd);
//   res.status(201).json({ id: newUser.id }); 
// });

app.delete("/users/:id", (req, res) => {
  const _id = req.params.id;
  console.log("Deleting user with ID:", _id);
  userService.deleteUserById(_id)
    .then((deletedUser) => {
      if (deletedUser) {
        console.log(`User with ID ${_id} deleted successfully. Sending 204 status...`);
        res.status(204).send(); // Sending a 204 status to indicate success with no content
      } else {
        console.log(`User with ID ${_id} not found. Sending 404 status...`);
        res.status(404).send("User not found."); // Sending a 404 status if user ID not found
      }
    })
    .catch((error) => {
      console.error(`Error deleting user with ID ${_id}:`, error);
      res.status(500).send("Internal Server Error"); // Sending a 500 status for internal server error
    });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


