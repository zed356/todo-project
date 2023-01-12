const express = require("express");

const app = express();

app.get("/", (_: any, res: Express.Response) => {
  res.send("First yes bish");
});

app.listen(8080);
