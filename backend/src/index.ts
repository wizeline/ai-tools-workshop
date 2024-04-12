const express = require("express");

const helpers = require("./utils/json-helpers");

const app = express();
const port = 3000;

app.get("/", async (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
