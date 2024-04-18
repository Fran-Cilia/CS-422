import express, { Request } from "express";
import { db, users } from "./db";
import cors from "cors";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cors<Request>());

app.get("/", (req, res) => {
  res.send("Hello World from Express 1");
});

app.post("/createUser", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Bad Request: User name not provided");
  }

  const { name } = req.body;

  try {
    const result = await db.insert(users).values({ name });
  } catch (e) {
    return res.status(500).send(`Internal Server Error: ${e}`);
  }

  return res.status(200).send();
});

app.get("/getUsers", async (req, res) => {
  const result = await db.select().from(users);

  // console.log(`USERS: ${JSON.stringify(result)}`);

  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
