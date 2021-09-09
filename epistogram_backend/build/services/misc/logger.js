"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logError = exports.logWarning = void 0;
const logWarning = (content) => exports.log(content, "warning");
exports.logWarning = logWarning;
const logError = (content) => exports.log(content, "error");
exports.logError = logError;
const log = (content, entryType) => {
    if (!entryType)
        entryType = "info";
    if (entryType == "warning")
        console.warn(content);
    if (entryType == "error")
        console.error(content);
    if (entryType == "info")
        console.log(content);
};
exports.log = log;
//# sourceMappingURL=logger.js.map