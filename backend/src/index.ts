const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/activities", require("./routes/activities"));

app.get("/", async (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
