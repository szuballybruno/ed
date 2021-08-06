import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { globalConfig } from '../server';

export const generateToken = async (req: Request, res: Response, next: NextFunction, userId: string, email: string): Promise<string> => {
    console.log(userId, email)
    return jwt.sign(
        { userId: userId, email: email },
        globalConfig.mail.tokenMailSecret,
        { expiresIn: '24h' }
    );
}
