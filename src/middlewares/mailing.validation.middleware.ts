import { NextFunction, Request, Response } from "express";
import CustomError from "../classes/customError";
import { MailValid } from "../models/mail";
import { getMissingFields } from "../utils/validation";

const createMailValid = (req: Request, res: Response, next: NextFunction) => {
  const { name, content, sendAt, needToSend = 0 } = req.body;

  const missingFields = getMissingFields(req, MailValid);

  if (missingFields.length > 0) {
    throw new CustomError(
      "Missing required fields: " + missingFields.join(", "),
      400
    );
  }

  const nameValidation = MailValid.name.validate(name);
  if (nameValidation !== true) {
    throw new CustomError(nameValidation, 400);
  }

  const contentValidation = !content || MailValid.content.validate(content);
  if (contentValidation !== true) {
    throw new CustomError(contentValidation, 400);
  }

  const sendAtValidation = MailValid.sendAt.validate(sendAt);
  if (sendAtValidation !== true) {
    throw new CustomError(sendAtValidation, 400);
  }

  const needToSendValidation = MailValid.needToSend.validate(needToSend);
  if (needToSendValidation !== true) {
    throw new CustomError(needToSendValidation, 400);
  }

  next();
};

const updateMailValid = (req: Request, res: Response, next: NextFunction) => {
  const { name, content, sendAt, needToSend, totalSended, isPaused } = req.body;

  if (
    name === undefined &&
    content === undefined &&
    sendAt === undefined &&
    needToSend === undefined &&
    totalSended === undefined &&
    isPaused === undefined
  ) {
    throw new CustomError("No fields found", 400);
  }

  const nameValidation = name === undefined || MailValid.name.validate(name);
  if (nameValidation !== true) {
    throw new CustomError(nameValidation, 400);
  }

  const contentValidation =
    content === undefined || MailValid.content.validate(content);
  if (contentValidation !== true) {
    throw new CustomError(contentValidation, 400);
  }

  const sendAtValidation =
    sendAt === undefined || MailValid.sendAt.validate(sendAt);
  if (sendAtValidation !== true) {
    throw new CustomError(sendAtValidation, 400);
  }

  const needToSendValidation =
    needToSend === undefined || MailValid.needToSend.validate(needToSend);
  if (needToSendValidation !== true) {
    throw new CustomError(needToSendValidation, 400);
  }

  const totalSendedValidation =
    totalSended === undefined || MailValid.totalSended.validate(totalSended);
  if (totalSendedValidation !== true) {
    throw new CustomError(totalSendedValidation, 400);
  }

  const isPausedValidation =
    isPaused === undefined || MailValid.isPaused.validate(isPaused);
  if (isPausedValidation !== true) {
    throw new CustomError(isPausedValidation, 400);
  }

  next();
};

const uploadImageValid = (req: Request, res: Response, next: NextFunction) => {
  const image = req.file;
  if (!image) throw new CustomError("No file provided", 400);

  next();
};

export { createMailValid, updateMailValid, uploadImageValid };
