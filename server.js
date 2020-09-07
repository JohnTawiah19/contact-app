const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// paste the code from codegen here
// Request Handler
app.post("/addHandle", async (req, res) => {
  // get request input
  let { handle } = req.body.input;

  // run some business logic
  handle = `www.twitter.com/${handle}`;

  /*
  // In case of errors:
  return res.status(400).json({
    message: "error happened"
  })
  */

  // success
  return res.json({
    twitter: handle,
  });
});

app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
