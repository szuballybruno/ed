import { useReactQuery2 } from "../../frontendHelpers";
import { AdminPageUserDTO } from "../../models/shared_models/AdminPageUserDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { usePostDataUnsafe } from "../core/httpClient";

export const useUserListQuery = () => {

    const queryResult = useReactQuery2<AdminPageUserDTO[]>(apiRoutes.user.getUserListForAdministration);

    return {
        users: queryResult.data ?? [],
        usersStatus: queryResult.state,
        usersError: queryResult.error,
        refetchUsers: queryResult.refetch,
    };
}

export const useSaveUserData = () => {

    const postDataResult = usePostDataUnsafe<UserDTO, void>(apiRoutes.user.upadateUser);

    const saveUserData = (firstName: string, lastName: string, phoneNumber: string) => {

        return postDataResult.postDataAsync({
            firstName: firstName,
            lastName,
            phoneNumber
        } as UserDTO);
    }

    return {
        saveUserDataState: postDataResult.state,
        saveUserData
    }
}