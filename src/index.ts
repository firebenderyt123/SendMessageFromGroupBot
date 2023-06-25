import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});

export { app };
