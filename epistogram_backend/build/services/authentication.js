"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookies = exports.getUserLoginTokens = exports.logOutUser = exports.logInUser = exports.renewUserSession = exports.getUserIdFromRequest = exports.getUserDTOByCredentials = exports.authorizeRequest = exports.getRequestAccessTokenPayload = exports.refreshTokenCookieName = exports.accessTokenCookieName = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../utilities/helpers");
const crypt_1 = require("./misc/crypt");
const jwtGen_1 = require("./misc/jwtGen");
const logger_1 = require("./misc/logger");
const mappings_1 = require("./mappings");
const userService_1 = require("./userService");
const staticProvider_1 = require("../staticProvider");
// CONSTS
exports.accessTokenCookieName = "accessToken";
exports.refreshTokenCookieName = "refreshToken";
// PUBLICS
const getRequestAccessTokenPayload = (req) => {
    var _a;
    const accessToken = (_a = helpers_1.getCookie(req, exports.accessTokenCookieName)) === null || _a === void 0 ? void 0 : _a.value;
    if (!accessToken)
        return null;
    const tokenPayload = jwtGen_1.verifyJWTToken(accessToken, staticProvider_1.staticProvider.globalConfig.security.jwtSignSecret);
    if (!tokenPayload)
        return null;
    return tokenPayload;
};
exports.getRequestAccessTokenPayload = getRequestAccessTokenPayload;
const authorizeRequest = (req) => {
    return new Promise((resolve, reject) => {
        var _a;
        const accessToken = (_a = helpers_1.getCookie(req, exports.accessTokenCookieName)) === null || _a === void 0 ? void 0 : _a.value;
        if (!accessToken)
            throw new helpers_1.TypedError("Access token missing!", "forbidden");
        const tokenMeta = jwtGen_1.verifyJWTToken(accessToken, staticProvider_1.staticProvider.globalConfig.security.jwtSignSecret);
        if (!tokenMeta)
            throw new helpers_1.TypedError("Invalid token!", "forbidden");
        resolve(tokenMeta);
    });
};
exports.authorizeRequest = authorizeRequest;
const getUserDTOByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService_1.getUserByEmail(email);
    if (!user)
        return null;
    const isPasswordCorrect = yield crypt_1.comparePasswordAsync(password, user.password);
    if (!isPasswordCorrect)
        return null;
    return mappings_1.toUserDTO(user);
});
exports.getUserDTOByCredentials = getUserDTOByCredentials;
const getUserIdFromRequest = (req) => {
    var _a;
    // check if there is a refresh token sent in the request 
    const accessToken = (_a = helpers_1.getCookie(req, "accessToken")) === null || _a === void 0 ? void 0 : _a.value;
    if (!accessToken)
        throw new helpers_1.TypedError("Access token not sent.", "bad request");
    // check sent access token if invalid by signature or expired
    const tokenMeta = jwtGen_1.verifyJWTToken(accessToken, staticProvider_1.staticProvider.globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        throw new helpers_1.TypedError("Access token validation failed.", "forbidden");
    return tokenMeta.userId;
};
exports.getUserIdFromRequest = getUserIdFromRequest;
const renewUserSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    logger_1.log("Renewing user session...");
    // check if there is a refresh token sent in the request 
    const refreshToken = (_a = helpers_1.getCookie(req, "refreshToken")) === null || _a === void 0 ? void 0 : _a.value;
    if (!refreshToken)
        throw new helpers_1.TypedError("Refresh token not sent.", "bad request");
    // check sent refresh token if invalid by signature or expired
    const tokenMeta = jwtGen_1.verifyJWTToken(refreshToken, staticProvider_1.staticProvider.globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        throw new helpers_1.TypedError("Refresh token validation failed.", "forbidden");
    // check if this refresh token is associated to the user
    const refreshTokenFromDb = yield userService_1.getUserActiveTokenById(tokenMeta.userId);
    if (!refreshTokenFromDb)
        throw new helpers_1.TypedError(`User has no active token, or it's not the same as the one in request! User id '${tokenMeta.userId}', active token '${refreshTokenFromDb}'`, "forbidden");
    // get user 
    const user = yield userService_1.getUserDTOById(tokenMeta.userId);
    if (!user)
        throw new helpers_1.TypedError("User not found by id " + tokenMeta.userId, "internal server error");
    // get tokens
    const newAccessToken = getAccessToken(user);
    const newRefreshToken = getRefreshToken(user);
    // save refresh token to DB
    yield userService_1.setUserActiveRefreshToken(user.userId, refreshToken);
    yield exports.setAuthCookies(res, newAccessToken, newRefreshToken);
});
exports.renewUserSession = renewUserSession;
const logInUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log(`Logging in user... ${email} - ${password}`);
    // further validate request 
    if (!email || !password)
        throw new helpers_1.TypedError("Email or password is null.", "bad request");
    // authenticate
    const userDTO = yield exports.getUserDTOByCredentials(email, password);
    if (!userDTO)
        throw new helpers_1.TypedError("Invalid credentials.", "forbidden");
    logger_1.log("User logged in: ");
    logger_1.log(userDTO);
    return yield exports.getUserLoginTokens(userDTO);
});
exports.logInUser = logInUser;
const logOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenMeta = exports.getRequestAccessTokenPayload(req);
    if (!tokenMeta)
        throw new helpers_1.TypedError("Token meta not found.", "internal server error");
    // remove refresh token, basically makes it invalid from now on
    yield userService_1.removeRefreshToken(tokenMeta.userId);
    // remove browser cookies
    res.clearCookie(exports.accessTokenCookieName);
    res.clearCookie(exports.refreshTokenCookieName);
});
exports.logOutUser = logOutUser;
const getUserLoginTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // get tokens
    const accessToken = getAccessToken(user);
    const refreshToken = getRefreshToken(user);
    // save refresh token to DB
    logger_1.log(`Setting refresh token of user '${user.userId}' to '${refreshToken}'`);
    yield userService_1.setUserActiveRefreshToken(user.userId, refreshToken);
    return {
        accessToken,
        refreshToken
    };
});
exports.getUserLoginTokens = getUserLoginTokens;
const setAuthCookies = (res, accessToken, refreshToken) => {
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
};
exports.setAuthCookies = setAuthCookies;
// PRIVATES
const getPlainObjectUserInfoDTO = (user) => {
    return {
        userId: user.userId,
        organizationId: user.organizationId
    };
};
const getAccessToken = (user) => {
    const token = jsonwebtoken_1.default.sign(getPlainObjectUserInfoDTO(user), staticProvider_1.staticProvider.globalConfig.security.jwtSignSecret, {
        expiresIn: `${staticProvider_1.staticProvider.globalConfig.security.accessTokenLifespanInS}s`
    });
    return token;
};
const getRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(getPlainObjectUserInfoDTO(user), staticProvider_1.staticProvider.globalConfig.security.jwtSignSecret, {
        expiresIn: staticProvider_1.staticProvider.globalConfig.security.refreshTokenLifespanInS
    });
};
const setAccessTokenCookie = (res, accessToken) => {
    res.cookie(exports.accessTokenCookieName, accessToken, {
        secure: false,
        httpOnly: true,
        expires: dayjs_1.default().add(staticProvider_1.staticProvider.globalConfig.security.accessTokenLifespanInS, "seconds").toDate()
    });
};
const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie(exports.refreshTokenCookieName, refreshToken, {
        secure: false,
        httpOnly: true,
        expires: dayjs_1.default().add(staticProvider_1.staticProvider.globalConfig.security.refreshTokenLifespanInS, "seconds").toDate()
    });
};
//# sourceMappingURL=authentication.js.map