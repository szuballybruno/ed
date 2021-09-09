"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswordAsync = exports.hashPasswordAsync = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPasswordAsync = (password) => bcryptjs_1.default.hash(password, 12);
exports.hashPasswordAsync = hashPasswordAsync;
const comparePasswordAsync = (passwordA, passwordB) => bcryptjs_1.default.compare(passwordA, passwordB);
exports.comparePasswordAsync = comparePasswordAsync;
//# sourceMappingURL=crypt.js.map