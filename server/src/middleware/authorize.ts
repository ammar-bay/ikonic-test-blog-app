import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";

const authorizeMiddleware = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ msg: "You need to be authenticated to access this resource" });
    }
    const { role } = req.user;

    if (allowedRoles.includes(role)) {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "You do not have permission to access this resource" });
    }
  };
};

export default authorizeMiddleware;
