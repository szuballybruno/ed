import { CreateInvitedUserDTO } from "../models/shared_models/CreateInvitedUserDTO";
import FinalizeUserRegistrationDTO from "../models/shared_models/FinalizeUserRegistrationDTO";
import { httpPostAsync } from "./httpClient";

export const createInvitedUserAsync = (dto: CreateInvitedUserDTO) => {

    return httpPostAsync("users/create-invited-user", dto);
}

export const finalizeUserRegistartionAsync = (dto: FinalizeUserRegistrationDTO) => {

    return httpPostAsync("users/finalize-user-registration", dto);
}