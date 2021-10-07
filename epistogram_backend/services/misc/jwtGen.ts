import { sign, verify } from 'jsonwebtoken';

export const getJWTToken = <TTokenPayload>(
    tokenData: TTokenPayload,
    secret: string,
    expiresIn: string | number): string => {

    return sign(tokenData as any, secret, { expiresIn: expiresIn });
}

export const verifyJWTToken = <TTokenPayload>(token: string, secret: string) => {

    return verify(token, secret) as TTokenPayload;
}
