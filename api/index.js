const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  res.json({ text: "Example response from API" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
