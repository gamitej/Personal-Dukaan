import express from "express";
import cors from "cors";
import database from "./database/connection.js";
// routes
import SalesRoute from "./routes/sales.route.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/sales", SalesRoute);

try {
  await database.sync();
  console.log("connnection successful");
} catch (error) {
  console.log("Unable to connect");
}

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});