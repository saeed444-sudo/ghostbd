import express from "express";
import multer from "multer";
import { pool } from "./db.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// static frontend serve
app.use(express.static("public"));

// upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  const { buffer, mimetype, originalname } = req.file;
  try {
    await pool.query(
      "INSERT INTO images (name, data, mimetype) VALUES ($1, $2, $3)",
      [originalname, buffer, mimetype]
    );
    res.send("oops sorry, we think our server is getting in some trouble!😅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error storing image");
  }
});

// view route
app.get("/image/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT data, mimetype FROM images WHERE id=$1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.set("Content-Type", result.rows[0].mimetype);
    res.send(result.rows[0].data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving image");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
