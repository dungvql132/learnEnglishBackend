import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { type IPayload } from "@src/common/base/interface/payload";

export async function requiredTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1]
    ? req.headers.authorization?.split(" ")[1]
    : req.headers.authorization?.split(" ")[0]; // Get token from Header Authorization

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, String(process.env.JWTSecret)) as IPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
