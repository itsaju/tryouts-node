const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send("Server is up");
});

const searchList = ["String 1", "String 2", "String 3", "String 4"];

app.get("/searchMyData", (req, res) => {
  const { search } = req.query;
  try {
    if (!search) {
      res.status(500).send({ message: "Missing input field" });
    } else if (search && search.length == 0) {
      res.status(500).send({ message: "Please enter a valid input" });
    } else {
      const data = searchList.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
      res.status(200).send({ data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log("Server is running");
});

module.exports = app;