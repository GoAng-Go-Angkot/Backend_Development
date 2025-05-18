import app from "./config/expressApp.js";
import pgClient from "./config/pgClient.js";

await pgClient.connect();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});