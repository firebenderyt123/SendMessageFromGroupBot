import { Router, Request, Response, NextFunction } from "express";
import { fileHistoryService } from "../services/historyService";
import {
  responseMiddleware,
  errorMiddleware,
} from "../middlewares/response.middleware";
import { createFileHistoryValid } from "../middlewares/history.validation.middleware";

const router: Router = Router();

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const historyFiles = await fileHistoryService.searchAll();
      res.locals.data = historyFiles;
    } catch (err) {
      next(err);
    } finally {
      next();
    }
  },
  responseMiddleware,
  errorMiddleware
);

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const historyFile = await fileHistoryService.search({
        id: req.params.id,
      });
      res.locals.data = historyFile;
    } catch (err) {
      next(err);
    } finally {
      next();
    }
  },
  responseMiddleware,
  errorMiddleware
);

router.post(
  "/",
  createFileHistoryValid,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const historyFile = await fileHistoryService.createFileHistory(req.body);
      res.locals.data = historyFile;
    } catch (err) {
      next(err);
    } finally {
      next();
    }
  },
  responseMiddleware,
  errorMiddleware
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const historyFile = await fileHistoryService.deleteFileHistory(
        req.params.id
      );
      res.locals.data = historyFile;
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
