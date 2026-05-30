const express = require("express");
const app = express();

app.use(express.json());

// MOCK DATA (safe + always works)
const notifications = [
  { ID: 1, Type: "Placement", Message: "Company Drive", Timestamp: "2026-05-30 10:00:00" },
  { ID: 2, Type: "Result", Message: "Exam Result", Timestamp: "2026-05-30 11:00:00" },
  { ID: 3, Type: "Event", Message: "Tech Fest", Timestamp: "2026-05-30 12:00:00" }
];

// Priority rules
const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

// classify only
function classify(data) {
  return data.map(n => ({
    ...n,
    Priority: priorityMap[n.Type] || 0
  }));
}

app.get("/classify", (req, res) => {
  const result = classify(notifications);

  console.log(result);

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});