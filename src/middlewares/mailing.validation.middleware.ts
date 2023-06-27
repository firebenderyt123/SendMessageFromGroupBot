import { NextFunction, Request, Response } from "express";
import { CreateMailData, MailValid } from "../models/mail";
import { getMissingFields } from "../utils/validation";

const createMailValid = (req: Request, res: Response, next: NextFunction) => {
  const { name, image, content, needToSend = -1 } = req.body;

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
  const { name, image, content, needToSend } = req.body;

  if (!name && !image && !content && !needToSend) {
    return res.status(400).json({ error: true, message: "No fields found" });
  }

  const nameValidation = !name || MailValid.name.validate(name);
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

  const needToSendValidation =
    !needToSend || MailValid.needToSend.validate(needToSend);
  if (needToSendValidation !== true) {
    return res.status(400).json({ error: true, message: needToSendValidation });
  }

  next();
};

export { createMailValid, updateMailValid };