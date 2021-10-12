import { sign, verify } from 'jsonwebtoken';
import { TypedError } from '../../utilities/helpers';

export const getJWTToken = <TTokenPayload>(
    tokenData: TTokenPayload,
    secret: string,
    expiresIn: string | number): string => {

    return sign(tokenData as any, secret, { expiresIn: expiresIn });
}

export const verifyJWTToken = <TTokenPayload>(token: string, secret: string) => {

    const payload = verify(token, secret) as TTokenPayload;

    if (!payload)
        throw new TypedError("Token verification failed!", "forbidden");

    return payload;
}
