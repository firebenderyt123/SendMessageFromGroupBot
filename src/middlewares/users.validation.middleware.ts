import { NextFunction, Request, Response } from "express";
import CustomError from "../classes/customError";
import { UserValid } from "../models/user";
import { getMissingFields } from "../utils/validation";

const createUserValid = (req: Request, res: Response, next: NextFunction) => {
  const { id, firstName } = req.body;

  const missingFields = getMissingFields(req, UserValid);

  if (missingFields.length > 0) {
    throw new CustomError(
      "Missing required fields: " + missingFields.join(", "),
      400
    );
  }

  const idValidation = UserValid.id.validate(id);
  if (idValidation !== true) {
    throw new CustomError(idValidation, 400);
  }

  const firstNameValidation = UserValid.firstName.validate(firstName);
  if (firstNameValidation !== true) {
    throw new CustomError(firstNameValidation, 400);
  }

  next();
};

const updateUserValid = (req: Request, res: Response, next: NextFunction) => {
  const { firstName } = req.body;

  if (firstName === undefined) {
    throw new CustomError("No fields found", 400);
  }

  const firstNameValidation =
    firstName === undefined || UserValid.firstName.validate(firstName);
  if (firstNameValidation !== true) {
    throw new CustomError(firstNameValidation, 400);
  }

  next();
};

export { createUserValid, updateUserValid };
