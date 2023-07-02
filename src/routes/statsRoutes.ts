import { Router, Request, Response, NextFunction } from "express";
import { fileHistoryService } from "../services/historyService";
import {
  responseMiddleware,
  errorMiddleware,
} from "../middlewares/response.middleware";

const router: Router = Router();

router.get(
  "/files",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await fileHistoryService.stats();
      res.locals.data = stats;
    } catch (err) {
      next(err);
    } finally {
      next();
    }
  },
  responseMiddleware,
  errorMiddleware
);

export { router };
