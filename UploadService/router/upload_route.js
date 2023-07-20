// IMPORTS
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// VARIABLES
const router = express.Router();

// FUNCTIONS
const { insertFileInFolder } = require("../model/upload");

// ROUTES
router.post("/:id", (req, res) => {
  try {
    Object.keys(req.files).forEach(async function (key) {
      const file = req.files[key];
      const fileName = file.name;
      const filePath = path.join("./uploads/", req.params.id, "/", fileName);
      const size = file.size;
      const type = file.mimetype;
      const isInsert = await insertFileInFolder(
        req.params.id,
        fileName,
        filePath,
        size,
        type
      );
      if (!isInsert) {
        return res.status(500).send("Internal Server Error");
      } else {
        fs.writeFile(filePath, file.data, function (err) {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
          }else{
            return res.status(201).send("File uploaded");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/folder/:idFolder/file/:idFile", async (req, res) => {
  try {
    const filePath = path.join("./uploads/", req.params.idFolder, "/", req.params.idFile);
    const data = fs.readFileSync(filePath);
    const dataBase64 = Buffer.from(data).toString("base64");
    return res.status(200).send(dataBase64);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// EXPORTS
module.exports = router;
