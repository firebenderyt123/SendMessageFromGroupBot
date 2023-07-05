import { Express } from "express";
import { router as historyRoutes } from "./historyRoutes";
import { router as usersRoutes } from "./usersRoutes";
import { statsFilesRoutes } from "./stats";

const initRoutes = (app: Express): void => {
  app.use("/api/history", historyRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/stats/files", statsFilesRoutes);
};

export { initRoutes };
