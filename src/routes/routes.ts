import { Express } from "express";
import { router as historyRoutes } from "./historyRoutes";
import { router as mailingRoutes } from "./mailingRoutes";
import { router as usersRoutes } from "./usersRoutes";
import { router as statsRoutes } from "./statsRoutes";

const initRoutes = (app: Express): void => {
  app.use("/api/history", historyRoutes);
  app.use("/api/mailing", mailingRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/stats", statsRoutes);
};

export { initRoutes };
