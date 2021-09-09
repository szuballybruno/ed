"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensions = void 0;
exports.extensions = true;
Array.prototype.remove = function (func) {
    return this.filter(item => !func(item));
};
Array.prototype.orderBy = function (func) {
    const sorted = this
        .sort((a, b) => {
        if (func(a) < func(b))
            return -1;
        if (func(a) > func(b))
            return 1;
        return 0;
    });
    return sorted;
};
//# sourceMappingURL=jsExtensions.js.map