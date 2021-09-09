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
exports.resetUserPasswordAction = exports.finalizeUserRegistrationAction = exports.createInvitedUserAction = void 0;
const authentication_1 = require("../services/authentication");
const emailService_1 = require("../services/emailService");
const jwtGen_1 = require("../services/misc/jwtGen");
const userManagementService_1 = require("../services/userManagementService");
const userService_1 = require("../services/userService");
const staticProvider_1 = require("../staticProvider");
const helpers_1 = require("../utilities/helpers");
const createInvitedUserAction = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserId = authentication_1.getUserIdFromRequest(req);
    const dto = helpers_1.withValueOrBadRequest(req.body);
    yield userManagementService_1.createInvitedUserAsync(dto, currentUserId);
});
exports.createInvitedUserAction = createInvitedUserAction;
const finalizeUserRegistrationAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = helpers_1.withValueOrBadRequest(req.body);
    const { accessToken, refreshToken } = yield userManagementService_1.finalizeUserRegistrationAsync(dto);
    authentication_1.setAuthCookies(res, accessToken, refreshToken);
});
exports.finalizeUserRegistrationAction = finalizeUserRegistrationAction;
const resetUserPasswordAction = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    // get user 
    const user = yield userService_1.getUserById(userId);
    if (!user)
        throw new helpers_1.TypedError("User not found.", "bad request");
    // get reset token
    const resetPawsswordToken = yield jwtGen_1.getJWTToken({ userId: user.id }, staticProvider_1.staticProvider.globalConfig.mail.tokenMailSecret, "24h");
    // send mail
    const userFullName = `${user.lastName} ${user.firstName}`;
    yield emailService_1.sendResetPasswordMailAsync(user.email, userFullName, resetPawsswordToken);
});
exports.resetUserPasswordAction = resetUserPasswordAction;
//# sourceMappingURL=userManagementActions.js.map