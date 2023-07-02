import cors from "cors";
import express from "express";
import { join } from "path";
import { initRoutes } from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use("/", express.static(join(__dirname, "./client/build")));

app.use("/uploads", express.static(join(__dirname, "../uploads")));

const port = 8000;
app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});

export { app };
