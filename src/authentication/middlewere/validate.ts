import { type Request, type Response, type NextFunction } from "express";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token: string = req.headers.token as string;
  console.log("my token: ", token);
  next();
}
