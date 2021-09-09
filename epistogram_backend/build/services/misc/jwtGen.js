"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTToken = exports.getJWTToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const getJWTToken = (tokenData, secret, expiresIn) => {
    return jsonwebtoken_1.sign(tokenData, secret, { expiresIn: expiresIn });
};
exports.getJWTToken = getJWTToken;
const verifyJWTToken = (token, secret) => {
    return jsonwebtoken_1.verify(token, secret);
};
exports.verifyJWTToken = verifyJWTToken;
//# sourceMappingURL=jwtGen.js.map