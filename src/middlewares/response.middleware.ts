import { NextFunction, Request, Response } from "express";

const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.locals.data) {
    res.json(res.locals.data);
  }

  next();
};

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode: number = err.statusCode || 500;
  const errorMessage: string = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: true, message: errorMessage });

  next();
};

export { responseMiddleware, errorMiddleware };
