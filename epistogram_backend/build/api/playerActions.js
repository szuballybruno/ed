"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerDataAction = void 0;
const authentication_1 = require("../services/authentication");
const playerService_1 = require("../services/playerService");
const helpers_1 = require("../utilities/helpers");
exports.getPlayerDataAction = helpers_1.getAsyncActionHandler((req) => {
    const userId = authentication_1.getUserIdFromRequest(req);
    const dto = helpers_1.withValueOrBadRequest(req.body);
    const courseItemId = helpers_1.withValueOrBadRequest(dto.courseItemId);
    const courseItemType = helpers_1.withValueOrBadRequest(dto.courseItemType);
    return playerService_1.getPlayerDataAsync(userId, courseItemId, courseItemType);
});
//# sourceMappingURL=playerActions.js.map