import { Router, Request, Response, NextFunction } from "express";
import { mailingService } from "../services/mailingService";
import {
  responseMiddleware,
  errorMiddleware,
} from "../middlewares/response.middleware";
import { createMailValid } from "../middlewares/mailing.validation.middleware";

const router: Router = Router();

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mails = await mailingService.searchAll();
      res.locals.data = mails;
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
      const mails = await mailingService.search({ id: req.params.id });
      res.locals.data = mails;
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
  createMailValid,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mail = await mailingService.createMail(req.body);
      res.locals.data = mail;
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
