import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { createMerkleTree, getProof } from "./utils/proofHelpers";
import { generateToken } from "./middleware/auth";

const PORT = process.env.REACT_APP_SERVER_PORT || 3000;
import { protect } from "./middleware/auth";

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((_req: Request, res: Response, next) => {
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    "Access-Control-Allow-Methods": "POST,GET,PUT,OPTIONS",
    "access-control-allow-origin": "*",
    "Content-Type": "application/json; charset=utf-8"
  });
  next();
});

// Create a GET route
app.post("/api/getHexProof", protect, (req, res) => {
  const account: string = req.body.user;
  console.log("account", account);

  try {
    const proof = getProof(account);
    res.send({ success: true, data: proof });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error generating the hex proof" });
  }
});

createMerkleTree();
const token = generateToken();
console.log("token", token);

// Check that the server is up and running:
app.listen(PORT, () => console.log(`'Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
