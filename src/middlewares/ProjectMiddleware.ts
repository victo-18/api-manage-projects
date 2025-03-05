import { Request, Response, NextFunction } from "express";
import { check, validationResult, param } from "express-validator";

/**
 * Middleware to validate the fields are complete not empry
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const productHandlerInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check("projectName")
    .notEmpty()
    .withMessage("The project name is required")
    .exists()
    .run(req);
  await check("clientName")
    .notEmpty()
    .withMessage("The client name is required")
    .exists()
    .run(req);
  await check("description")
    .notEmpty()
    .withMessage("The project description is required")
    .exists()
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
    return;
  }
  next();
};

export const idValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paramsToValidate = ["id", "projectId", "taskId"];
 for(const paramsName of paramsToValidate){
     if(req.params[paramsName]){
      await param(paramsName) .isMongoId().withMessage("The ID doesn't have the MongoDB structure.").run(req);
     }
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
      return;
    }
 }
  // if(req.params.id || req.params.projectId|| req.params.taskId){
  //     await param("id")
  //     .isMongoId()
  //     .withMessage("The ID doesn't have the MongoDB structure.")
  //     .run(req);
   
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     res.status(400).json({ error: errors.array() });
  //     return;
  //   }
  // }

  next();
};
export const taskValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //validat si el id es valido para mongo
  await param("projectId").isMongoId().withMessage("The ID dosen't have the mongo structure").run(req)
  await check("name")
    .notEmpty()
    .withMessage("The task name is required")
    .exists()
    .run(req);
  await check("description")
    .notEmpty()
    .withMessage("The task description is required")
    .exists()
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
    return;
  }
  next();
};
