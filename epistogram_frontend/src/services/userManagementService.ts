import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import { httpPostAsync } from "./httpClient";

export const createInvitedUserAsync = (dto: CreateInvitedUserDTO) => {

    return httpPostAsync("users/create-invited-user", dto);
}