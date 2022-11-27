import { IXCookieOptions } from "./IXCookieOptions";

export type IXGatewayResponse = {
    respond(code: number, data?: any): void;
    setCookie(key: string, value: string, opts: IXCookieOptions): void;
    clearCookie(key: string, opts: IXCookieOptions): void;
};