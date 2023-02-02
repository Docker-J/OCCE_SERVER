const express = require("express");
const cors = require("cors");
const db = require("./api/firebase.js");
const app = express();
const PORT = process.env.port || 3001;

let RECENTDATE;

const getRecentdate = (async () => {
  try {
    const snapshot = await db
      .collection("Misc")
      .doc("RecentWeeklyBulletin")
      .get();

    RECENTDATE = snapshot.data().date;
    console.log(RECENTDATE);
  } catch {}
})();

app.use(cors());

app.get("/api/WeeklyUpdate/RecentDate", async (req, res) => {
  res.send(RECENTDATE);
});

app.get("/api/WeeklyUpdate/GetBulletin", async (req, res) => {
  try {
    const snapshot = await db
      .collection("weeklyBulletin")
      .doc(req.query.date)
      .get();
    res.send(snapshot.data().file);
  } catch {}
});

app.put("/api/WeeklyUpdate/PostBulletin", async (req, res) => {
  const data = {
    file: req.query.file,
  };
  try {
    await db.collection.doc(req.query.date).set(data);
    res.send("Success");
    if (req.query.date > RECENTDATE) {
      RECENTDATE = req.query.date;
    }
  } catch {
    res.send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
