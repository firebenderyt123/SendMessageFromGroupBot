import { Router, Request, Response, NextFunction } from "express";
import { usersService } from "../services/usersService";
import {
  responseMiddleware,
  errorMiddleware,
} from "../middlewares/response.middleware";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/users.validation.middleware";

const router: Router = Router();

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mails = await usersService.searchAll();
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
      const mail = await usersService.search({ id: +req.params.id });
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

router.post(
  "/",
  createUserValid,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mail = await usersService.createUser(req.body);
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

router.put(
  "/:id",
  updateUserValid,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mail = await usersService.updateUser(+req.params.id, req.body);
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

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mail = await usersService.deleteUser(+req.params.id);
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
