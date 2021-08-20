import jwt from 'jsonwebtoken';

export const getJWTToken = (tokenData: any, secret: string, expiresIn: string): string => {

    return jwt.sign(tokenData, secret, { expiresIn: expiresIn });
}
