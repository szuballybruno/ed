import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS' || !req.headers.authorization) {
    throw new Error("Azonosítás sikertelen");
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    jwt.verify(token, 'AROWILLSAVETHECODE');
  } catch (err) {
    throw new Error("Azonosítás sikertelen");
  }
};
