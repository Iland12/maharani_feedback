const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const FEEDBACK_FILE = "feedback.json";

app.post("/save-feedback", (req, res) => {
  const { message, name } = req.body;

  const entry = {
    name: name || "Anonymous",
    message,
    time: new Date().toISOString(),
  };

  let feedbackData = [];

  if (fs.existsSync(FEEDBACK_FILE)) {
    feedbackData = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  }

  feedbackData.push(entry);

  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackData, null, 2));

  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
