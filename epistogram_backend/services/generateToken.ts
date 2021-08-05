import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import { tokenMailSecret } from './environment';

export const generateToken = async (req: Request, res: Response, next: NextFunction, userId: string, email: string): Promise<string> => {
    console.log(userId, email)
    return jwt.sign(
            {userId: userId, email: email},
            tokenMailSecret,
            {expiresIn: '24h'}
    );
}
