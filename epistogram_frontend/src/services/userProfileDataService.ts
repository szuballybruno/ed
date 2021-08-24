import { useReactQuery } from "../frontendHelpers"
import { UserProfileDataDTO } from "../models/shared_models/UserProfileDataDTO";
import { httpGetAsync } from "./httpClient";

export const useUserProfileData = () => {

    const { data, ...result } = useReactQuery<UserProfileDataDTO>(
        ["userProfileDataQuery"],
        () => httpGetAsync("/get-user-profile-data"));

    return { userProfileData: data, ...result };
}