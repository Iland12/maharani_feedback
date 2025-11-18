const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

// Correct path for Render
const feedbackPath = path.join(__dirname, "data", "feedback.json");

// Ensure feedback.json exists
if (!fs.existsSync(feedbackPath)) {
  fs.writeFileSync(feedbackPath, "[]");
}

app.post("/feedback", (req, res) => {
  const feedback = req.body;

  fs.readFile(feedbackPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });

    let arr = JSON.parse(data);
    arr.push(feedback);

    fs.writeFile(feedbackPath, JSON.stringify(arr, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Write error" });

      res.json({ status: "saved" });
    });
  });
});

app.listen(3000, () => console.log("Server running on 3000"));

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

// Serve index.html
app.use(express.static(__dirname));

// Feedback file path
const feedbackPath = path.join(__dirname, "data", "feedback.json");

if (!fs.existsSync(feedbackPath)) {
  fs.writeFileSync(feedbackPath, "[]");
}

app.post("/feedback", (req, res) => {
  const feedback = req.body;

  fs.readFile(feedbackPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });

    let arr = JSON.parse(data);
    arr.push(feedback);

    fs.writeFile(feedbackPath, JSON.stringify(arr, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Write error" });

      res.json({ status: "saved" });
    });
  });
});

app.listen(3000, () => console.log("Server running on 3000"));
