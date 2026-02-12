// authMiddleware.ts
import type { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { AuthorizationError } from "./Errors.js";
import { FirebaseConfig } from "./FirebaseConfig.js";

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

new FirebaseConfig(); // initialize app

const PREFIX = "Bearer ";

export async function authenticate(
  req: AuthRequest,
  _: Response,
  next: NextFunction
) {
  
  const header = req.headers.authorization;

  if (!header || !header.startsWith(PREFIX)) {
    throw new AuthorizationError("Missing token");
  }

  const token = header.split(PREFIX)[1];
  if (!token) throw new AuthorizationError("Missing token");
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AuthorizationError("Invalid token");
  }
}
