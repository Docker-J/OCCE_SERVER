const express = require("express");
var cors = require("cors");
const db = require("./api/firebase.js");
const app = express();
const PORT = process.env.port || 3001;

app.use(cors());

app.get("/api/WeeklyUpdate/RecentDate", async (req, res) => {
  const snapshot = await db
    .collection("Misc")
    .doc("RecentWeeklyBulletin")
    .get();

  res.send(snapshot.data().date);
});

app.get("/api/WeeklyUpdate/GetBulletin", async (req, res) => {
  const snapshot = await db
    .collection("weeklyBulletin")
    .doc(req.query.date)
    .get();
  res.send(snapshot.data().file);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
