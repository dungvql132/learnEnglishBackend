import { type Request, type Response, type NextFunction } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(err);
    return;
  }
  console.log("the error: ", err);

  res.status(500).json({ message: "unknow" });
}

export { errorHandler };
