import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message:
            "You are unauthenticated. Please log in and permission to admin",
        });
      }
      // secret
      const secret = config.jwtSecret;
      const tokenDecoded = jwt.verify(
        token as string,
        secret as string
      ) as JwtPayload;
      // set user this tokenDecoded
      req.user = tokenDecoded;

      if (roles.length > 0 && !roles.includes(tokenDecoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Only admin create a vehicle.",
        });
      };

      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error?.message || "Not Validated",
      });
    }
  };
};

export default auth;
