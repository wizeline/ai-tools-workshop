const express = require("express");

const app = express();
const port = 3000;

app.get("/", async (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
