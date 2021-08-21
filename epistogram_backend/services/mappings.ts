import { User } from "../models/entities/User";
import { UserDTO } from "../models/shared_models/UserDTO";

export const toUserDTO = (user: User) => new UserDTO(
    user._id,
    user.userData.organizationId,
    user.userData.firstName,
    user.userData.lastName,
    user.userData.role);