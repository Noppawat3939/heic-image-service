import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import heicConvert from "heic-convert";
import axios from "axios";

const PORT = 4000;

const app = express();

app.use(cors()).use(
  rateLimit({
    windowMs: 1 * 1000,
    max: 100,
  })
);

app.get("/", async (_, res) =>
  res.redirect("https://github.com/Noppawat3939/heic-image-service")
);

app.get("/convert/heic", async (req, res) => {
  const { url = "", format = "png" } = req.query;

  if (
    !url ||
    url?.search(".heic") === -1 ||
    (format && !["png", "jpeg"].includes(format.toLowerCase()))
  )
    return res.send("failed convert heic image");

  try {
    const { data: buffer } = await axios({ url, responseType: "arraybuffer" });

    const arrBuffer = await heicConvert({
      buffer,
      format: format.toUpperCase(),
    });

    res.setHeader("Content-Type", `image/${format}`);
    res.send(arrBuffer);
  } catch (err) {
    console.debug(err);
    return res.send("failed convert heic image");
  }
});

app.get("/check", async (_, res) => {
  return res.status(200).json({
    success: true,
    message: "server is running smoothly",
    timestampt: new Date().toISOString().split("T").join(" "),
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
