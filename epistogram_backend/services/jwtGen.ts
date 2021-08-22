import { sign, verify } from 'jsonwebtoken';

export const getJWTToken = (tokenData: any, secret: string, expiresIn: string): string => {

    return sign(tokenData, secret, { expiresIn: expiresIn });
}

export const verifyJWTToken = <TTokenPayload>(token: string, secret: string) => {

    return verify(token, secret) as TTokenPayload;
}
