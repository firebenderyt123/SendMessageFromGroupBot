import cors from "cors";
import express from "express";
import { join } from "path";
import { initRoutes } from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use("/", express.static(join(__dirname, "../src/client/build")));

app.use("/uploads", express.static(join(__dirname, "../uploads")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../src/client/build", "index.html"));
});

const ip = "0.0.0.0";
const port = 8000;
app.listen(port, ip, () => {
  console.log(`Server started at: http://${ip}:${port}`);
});

export { app };
