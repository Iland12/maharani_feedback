const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Serve HTML files from /public
app.use(express.static(path.join(__dirname, "public")));

// Path to data file
const dataFile = path.join(__dirname, "data", "feedback.json");

// Save feedback
app.post("/save-feedback", (req, res) => {
  const feedback = req.body.feedback;

  const entry = {
    feedback: feedback,
    time: new Date().toLocaleString(),
  };

  let data = JSON.parse(fs.readFileSync(dataFile));
  data.push(entry);

  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.send("Feedback saved");
});

// Save name
app.post("/save-name", (req, res) => {
  const name = req.body.name;

  const entry = {
    name: name,
    time: new Date().toLocaleString(),
  };

  let data = JSON.parse(fs.readFileSync(dataFile));
  data.push(entry);

  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.send("Name saved");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
