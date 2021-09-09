"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedError = exports.getCookie = exports.getCookies = exports.getBearerTokenFromRequest = exports.withValueOrBadRequest = exports.getSingleFileFromRequest = exports.requestHasFiles = exports.withValue = exports.respond = exports.navPropNotNull = exports.throwNotImplemented = exports.handleAsyncAction = exports.getAsyncActionHandler = void 0;
const logger_1 = require("../services/misc/logger");
const getAsyncActionHandler = (action) => {
    return (req, res) => {
        exports.handleAsyncAction(req, res, action);
    };
};
exports.getAsyncActionHandler = getAsyncActionHandler;
const handleAsyncAction = (req, res, action) => {
    action(req, res)
        .then((returnValue) => exports.respond(res, 200, returnValue))
        .catch((error) => {
        var _a;
        logger_1.logError(error);
        respondError(res, error.message, ((_a = error.type) !== null && _a !== void 0 ? _a : "internal server error"));
        // next(error);
    });
};
exports.handleAsyncAction = handleAsyncAction;
const respondError = (res, msg, type) => {
    logger_1.logError(`Responding error: ${type}: ${msg}`);
    const errorDTO = {
        errorType: type,
        message: msg
    };
    switch (type) {
        case "bad request":
            exports.respond(res, 400, errorDTO);
            break;
        case "forbidden":
            exports.respond(res, 403, errorDTO);
            break;
        case "internal server error":
            exports.respond(res, 500, errorDTO);
            break;
        default:
            break;
    }
};
const throwNotImplemented = () => {
    throw new Error("Not implemented!");
};
exports.throwNotImplemented = throwNotImplemented;
const navPropNotNull = (prop) => {
    exports.withValue(prop, () => { throw new Error("Navigation property was null, or undefined. This could be caused by an improper or missing join."); });
};
exports.navPropNotNull = navPropNotNull;
const respond = (res, code, data) => {
    if (data) {
        logger_1.log("Responding with data, code: " + code);
        res.status(code).send(data);
    }
    else {
        logger_1.log("Responding, code: " + code);
        res.sendStatus(code);
    }
};
exports.respond = respond;
const withValue = (obj, errorFunc) => {
    if (!errorFunc)
        errorFunc = () => { throw new Error("Object has no value!"); };
    if (obj == "" || (!obj && obj != false))
        errorFunc();
    return obj;
};
exports.withValue = withValue;
const requestHasFiles = (req) => {
    return !!req.files;
};
exports.requestHasFiles = requestHasFiles;
const getSingleFileFromRequest = (req) => {
    if (!req.files)
        throw new TypedError("Request contains no files.", "bad request");
    // TODO multiple file error check
    return req.files.file;
};
exports.getSingleFileFromRequest = getSingleFileFromRequest;
const withValueOrBadRequest = (obj) => exports.withValue(obj, () => {
    throw new TypedError("Requied field has no value!", "bad request");
});
exports.withValueOrBadRequest = withValueOrBadRequest;
const getBearerTokenFromRequest = (req) => {
    const authHeader = req.headers.authorization;
    return authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
};
exports.getBearerTokenFromRequest = getBearerTokenFromRequest;
const getCookies = (req) => {
    const cookieString = req.headers.cookie;
    if (!cookieString)
        return [];
    return cookieString
        .split('; ')
        .map(x => ({
        key: x.split("=")[0],
        value: x.split("=")[1]
    }));
};
exports.getCookies = getCookies;
const getCookie = (req, key) => exports.getCookies(req).filter(x => x.key == key)[0];
exports.getCookie = getCookie;
class TypedError extends Error {
    constructor(msg, type) {
        super(msg);
        this.type = type;
        logger_1.logError("Error thrown: " + this.toString());
    }
    toString() {
        return `${this.type}: ${this.message}`;
    }
}
exports.TypedError = TypedError;
//# sourceMappingURL=helpers.js.map