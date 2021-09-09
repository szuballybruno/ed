"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor(userId, organizationId, firstName, lastName, role, jobTitle, isActive, email, phoneNumber, name, avatarUrl) {
        this.role = role;
        this.userId = userId;
        this.organizationId = organizationId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.isActive = isActive;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.avatarUrl = avatarUrl;
    }
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=UserDTO.js.map