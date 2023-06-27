import { NextFunction, Request, Response } from "express";
import { MailValid } from "../models/mail";
import { getMissingFields } from "../utils/validation";

const createMailValid = (req: Request, res: Response, next: NextFunction) => {
  const { name, image, content, sendAt, needToSend = -1 } = req.body;

  const missingFields = getMissingFields(req, MailValid);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: "Missing required fields: " + missingFields.join(", "),
    });
  }

  const nameValidation = MailValid.name.validate(name);
  if (nameValidation !== true) {
    return res.status(400).json({ error: true, message: nameValidation });
  }

  const imageValidation = !image || MailValid.image.validate(image);
  if (imageValidation !== true) {
    return res.status(400).json({ error: true, message: imageValidation });
  }

  const contentValidation = !content || MailValid.content.validate(content);
  if (contentValidation !== true) {
    return res.status(400).json({ error: true, message: contentValidation });
  }

  const sendAtValidation = MailValid.sendAt.validate(sendAt);
  if (sendAtValidation !== true) {
    return res.status(400).json({ error: true, message: sendAtValidation });
  }

  const needToSendValidation = MailValid.needToSend.validate(needToSend);
  if (needToSendValidation !== true) {
    return res.status(400).json({ error: true, message: needToSendValidation });
  }

  if (!image && !content) {
    return res
      .status(400)
      .json({ error: true, message: "Image or content might be inputed" });
  }

  next();
};

const updateMailValid = (req: Request, res: Response, next: NextFunction) => {
  const { name, image, content, sendAt, needToSend, totalSended, isPaused } =
    req.body;

  if (
    name === undefined &&
    image === undefined &&
    content === undefined &&
    sendAt === undefined &&
    needToSend === undefined &&
    totalSended === undefined &&
    isPaused === undefined
  ) {
    return res.status(400).json({ error: true, message: "No fields found" });
  }

  const nameValidation = name === undefined || MailValid.name.validate(name);
  if (nameValidation !== true) {
    return res.status(400).json({ error: true, message: nameValidation });
  }

  const imageValidation =
    image === undefined || MailValid.image.validate(image);
  if (imageValidation !== true) {
    return res.status(400).json({ error: true, message: imageValidation });
  }

  const contentValidation =
    content === undefined || MailValid.content.validate(content);
  if (contentValidation !== true) {
    return res.status(400).json({ error: true, message: contentValidation });
  }

  const sendAtValidation =
    sendAt === undefined || MailValid.sendAt.validate(sendAt);
  if (sendAtValidation !== true) {
    return res.status(400).json({ error: true, message: sendAtValidation });
  }

  const needToSendValidation =
    needToSend === undefined || MailValid.needToSend.validate(needToSend);
  if (needToSendValidation !== true) {
    return res.status(400).json({ error: true, message: needToSendValidation });
  }

  const totalSendedValidation =
    totalSended === undefined || MailValid.totalSended.validate(totalSended);
  if (totalSendedValidation !== true) {
    return res
      .status(400)
      .json({ error: true, message: totalSendedValidation });
  }

  const isPausedValidation =
    isPaused === undefined || MailValid.isPaused.validate(isPaused);
  if (isPausedValidation !== true) {
    return res.status(400).json({ error: true, message: isPausedValidation });
  }

  next();
};

export { createMailValid, updateMailValid };
