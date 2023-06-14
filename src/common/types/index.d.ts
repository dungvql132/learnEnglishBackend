export {};
import { IPayload } from "../base/interface";

declare global {
  namespace Express {
    interface Request {
      user?: IPayload;
    }
  }
}
