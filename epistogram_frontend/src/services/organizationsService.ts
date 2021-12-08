import { useQuery } from "react-query"
import { OrganizationDTO } from "../models/shared_models/OrganizationDTO";
import { httpGetAsync } from "./core/httpClient";

export const useOrganizations = () => {
    const url = "organizations/get-organizations";
    const { data, isLoading } = useQuery(
        ["getOrganizations"],
        () => httpGetAsync(url), {
        retry: false,
        refetchOnWindowFocus: false
    });

    return {
        organizations: (data ?? []) as OrganizationDTO[],
        isOrganizationsLoaded: !isLoading
    }
}