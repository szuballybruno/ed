import {Request, Response, NextFunction} from 'express'
import {config} from '../configuration/config';
import jwt from 'jsonwebtoken';

export const generateToken = async (req: Request, res: Response, next: NextFunction, userId: string, email: string): Promise<string> => {
    console.log(userId, email)
    return jwt.sign(
            {userId: userId, email: email},
            config.tokenMailSecret,
            {expiresIn: '24h'}
    );
}
