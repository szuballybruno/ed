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
exports.removeRefreshToken = exports.setUserActiveRefreshToken = exports.setUserAvatarFileId = exports.getCurrentUser = exports.getUserByEmail = exports.getUserActiveTokenById = exports.getUserDTOById = exports.getUserById = void 0;
const User_1 = require("../models/entity/User");
const staticProvider_1 = require("../staticProvider");
const helpers_1 = require("../utilities/helpers");
const authentication_1 = require("./authentication");
const mappings_1 = require("./mappings");
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .leftJoinAndSelect("user.avatarFile", "a")
        .getOneOrFail();
    // const cursor = await Connection.db.collection("users").find();
    // const usersFromDB = (await cursor.toArray());
    // const foundUser = usersFromDB.filter((x: any) => x?._id == userId)[0] as MongoUser;
    return user;
});
exports.getUserById = getUserById;
const getUserDTOById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield exports.getUserById(userId);
    if (!foundUser)
        return null;
    return mappings_1.toUserDTO(foundUser);
});
exports.getUserDTOById = getUserDTOById;
const getUserActiveTokenById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId }) as User;
    const foundUser = yield exports.getUserById(userId);
    if (!foundUser)
        return null;
    return foundUser.refreshToken;
});
exports.getUserActiveTokenById = getUserActiveTokenById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .createQueryBuilder("user")
        .where("user.email = :email", { email: email })
        .getOne();
    if (!user)
        return null;
    return user;
});
exports.getUserByEmail = getUserByEmail;
const getCurrentUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const authTokenPayload = authentication_1.getRequestAccessTokenPayload(req);
    if (!authTokenPayload)
        throw new helpers_1.TypedError("Token meta is missing!", "forbidden");
    const currentUser = yield exports.getUserDTOById(authTokenPayload.userId);
    if (!currentUser)
        throw new helpers_1.TypedError("User not found by id: " + authTokenPayload.userId, "bad request");
    return currentUser;
});
exports.getCurrentUser = getCurrentUser;
const setUserAvatarFileId = (userId, avatarFileId) => __awaiter(void 0, void 0, void 0, function* () {
    yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .save({
        id: userId,
        avatarFileId: avatarFileId
    });
});
exports.setUserAvatarFileId = setUserAvatarFileId;
const setUserActiveRefreshToken = (userId, refreshToken) => {
    return staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .save({
        id: userId,
        refreshToken: refreshToken
    });
};
exports.setUserActiveRefreshToken = setUserActiveRefreshToken;
const removeRefreshToken = (userId) => {
    return staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .save({
        id: userId,
        refreshToken: ""
    });
};
exports.removeRefreshToken = removeRefreshToken;
//# sourceMappingURL=userService.js.map