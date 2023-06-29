import { Express } from "express";
import { router as mailingRoutes } from "./mailingRoutes";
import { router as usersRoutes } from "./usersRoutes";

const initRoutes = (app: Express): void => {
  app.use("/api/mailing", mailingRoutes);
  app.use("/api/users", usersRoutes);
};

export { initRoutes };
