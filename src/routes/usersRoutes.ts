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
      const users = await usersService.searchAll();
      res.locals.data = users;
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
      const user = await usersService.search({ id: +req.params.id });
      res.locals.data = user;
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
      const user = await usersService.createUser(req.body);
      res.locals.data = user;
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
      const user = await usersService.updateUser(+req.params.id, req.body);
      res.locals.data = user;
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
      const user = await usersService.deleteUser(+req.params.id);
      res.locals.data = user;
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
