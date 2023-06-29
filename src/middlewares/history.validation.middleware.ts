import { NextFunction, Request, Response } from "express";
import CustomError from "../classes/customError";
import { FileHistoryValid } from "../models/history";
import { getMissingFields } from "../utils/validation";

const createFileHistoryValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId, fileIds } = req.body;

  const missingFields = getMissingFields(req, FileHistoryValid);

  if (missingFields.length > 0) {
    throw new CustomError(
      "Missing required fields: " + missingFields.join(", "),
      400
    );
  }

  const postIdValidation = FileHistoryValid.postId.validate(postId);
  if (postIdValidation !== true) {
    throw new CustomError(postIdValidation, 400);
  }

  const fileIdsValidation = FileHistoryValid.fileIds.validate(fileIds);
  if (fileIdsValidation !== true) {
    throw new CustomError(fileIdsValidation, 400);
  }

  next();
};

export { createFileHistoryValid };
