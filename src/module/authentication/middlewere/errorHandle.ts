import { type Request, type Response, type NextFunction } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(err);
    return;
  }
  console.log("the error: ", err);

  return res.status(500).json({ message: err.message });
}

export { errorHandler };
