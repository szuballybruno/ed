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
exports.finalizeUserRegistrationAsync = exports.createInvitedUserWithOrgAsync = exports.createInvitedUserAsync = void 0;
const User_1 = require("../models/entity/User");
const staticProvider_1 = require("../staticProvider");
const helpers_1 = require("../utilities/helpers");
const authentication_1 = require("./authentication");
const emailService_1 = require("./emailService");
const crypt_1 = require("./misc/crypt");
const jwtGen_1 = require("./misc/jwtGen");
const logger_1 = require("./misc/logger");
const userService_1 = require("./userService");
const createInvitedUserAsync = (dto, currentUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield userService_1.getUserById(currentUserId);
    // if user is admin require organizationId to be provided
    // otherwise use the current user's organization
    const organizationId = currentUser.role === "admin"
        ? helpers_1.withValueOrBadRequest(dto.organizationId)
        : currentUser.organizationId;
    return exports.createInvitedUserWithOrgAsync(dto, organizationId, true);
});
exports.createInvitedUserAsync = createInvitedUserAsync;
const createInvitedUserWithOrgAsync = (dto, organizationId, sendEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // get and check sent data 
    const email = helpers_1.withValueOrBadRequest(dto.email);
    const role = helpers_1.withValueOrBadRequest(dto.role);
    const firstName = helpers_1.withValueOrBadRequest(dto.firstName);
    const lastName = helpers_1.withValueOrBadRequest(dto.lastName);
    const jobTitle = helpers_1.withValueOrBadRequest(dto.jobTitle);
    const userFullName = `${lastName} ${firstName}`;
    // does user already exist?
    const existingUser = yield userService_1.getUserByEmail(email);
    if (existingUser)
        throw new helpers_1.TypedError("User already exists.", "bad request");
    // hash user password 
    const hashedDefaultPassword = yield crypt_1.hashPasswordAsync("guest");
    const user = {
        isActive: true,
        email: email,
        role: role,
        firstName: firstName,
        lastName: lastName,
        organizationId: organizationId,
        password: hashedDefaultPassword,
        jobTitle: jobTitle,
        isInvitedOnly: true
    };
    const insertResults = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .insert(user);
    const userId = user.id;
    // send invitaion mail
    const invitationToken = jwtGen_1.getJWTToken({ userId: userId }, staticProvider_1.staticProvider.globalConfig.mail.tokenMailSecret, "24h");
    yield yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .save({
        id: userId,
        invitationToken: invitationToken
    });
    if (sendEmail) {
        logger_1.log("Sending mail... to: " + email);
        yield emailService_1.sendInvitaitionMailAsync(invitationToken, email, userFullName);
    }
    return { invitationToken, user };
});
exports.createInvitedUserWithOrgAsync = createInvitedUserWithOrgAsync;
const finalizeUserRegistrationAsync = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const invitationToken = helpers_1.withValueOrBadRequest(dto.invitationToken);
    const controlPassword = helpers_1.withValueOrBadRequest(dto.controlPassword);
    const password = helpers_1.withValueOrBadRequest(dto.password);
    const phoneNumber = helpers_1.withValueOrBadRequest(dto.phoneNumber);
    const tokenPayload = jwtGen_1.verifyJWTToken(invitationToken, staticProvider_1.staticProvider.globalConfig.mail.tokenMailSecret);
    if (!tokenPayload)
        throw new helpers_1.TypedError("Invitation token is invalid or expired!", "forbidden");
    const userDTO = yield userService_1.getUserDTOById(tokenPayload.userId);
    if (!userDTO)
        throw new helpers_1.TypedError("Invited user not found by id: " + tokenPayload.userId, "bad request");
    if (password != controlPassword)
        throw new helpers_1.TypedError("Passwords are not equal!", "bad request");
    // hash password
    const hashedPassword = yield crypt_1.hashPasswordAsync(password);
    yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .save({
        id: tokenPayload.userId,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        invitationToken: "",
        isInvitedOnly: false
    });
    const { accessToken, refreshToken } = yield authentication_1.getUserLoginTokens(userDTO);
    return {
        accessToken,
        refreshToken
    };
});
exports.finalizeUserRegistrationAsync = finalizeUserRegistrationAsync;
//# sourceMappingURL=userManagementService.js.map