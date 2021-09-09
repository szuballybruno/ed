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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutUserAction = exports.getCurrentUserAction = exports.logInUserAction = exports.renewUserSessionAction = void 0;
const authentication_1 = require("../services/authentication");
const userService_1 = require("../services/userService");
const helpers_1 = require("../utilities/helpers");
const renewUserSessionAction = (req, res) => {
    helpers_1.handleAsyncAction(req, res, (req) => authentication_1.renewUserSession(req, res));
};
exports.renewUserSessionAction = renewUserSessionAction;
const logInUserAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check request 
    if (!req.body)
        throw new helpers_1.TypedError("Body is null.", "bad request");
    // get credentials from request
    const { email, password } = req.body;
    const { accessToken, refreshToken } = yield authentication_1.logInUser(email, password);
    yield authentication_1.setAuthCookies(res, accessToken, refreshToken);
});
exports.logInUserAction = logInUserAction;
const getCurrentUserAction = (req, res, next) => {
    helpers_1.handleAsyncAction(req, res, userService_1.getCurrentUser);
};
exports.getCurrentUserAction = getCurrentUserAction;
const logOutUserAction = (req, res, next) => {
    helpers_1.handleAsyncAction(req, res, (req) => authentication_1.logOutUser(req, res));
};
exports.logOutUserAction = logOutUserAction;
//# sourceMappingURL=authenticationActions.js.map