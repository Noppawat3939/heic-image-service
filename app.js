import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import heicConvert from "heic-convert";
import axios from "axios";

const PORT = 4000;

const app = express();

app.use(
  cors(),
  rateLimit({
    windowMs: 1 * 1000,
    max: 100,
  })
);

app.get("/convert/heic", async (req, res) => {
  const { url = "", format = "png" } = req.query;

  if (!url || url?.search(".heic") == -1)
    return res.send("failed convert heic image");

  try {
    const { data } = await axios({ url, responseType: "arraybuffer" });

    const buffer = await heicConvert({
      buffer: data,
      format: format.toUpperCase(),
    });

    res.setHeader("Content-Type", `image/${format}`);
    res.send(buffer);
  } catch (err) {
    console.log("failed fetch", err);
    return res.send("failed convert heic image");
  }
});

try {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
} catch (err) {
  console.log(err);
}
