import { Express } from "express";
import { router as mailingRoutes } from "./mailingRoutes";

const initRoutes = (app: Express): void => {
  app.use("/api/mailing", mailingRoutes);
};

export { initRoutes };
