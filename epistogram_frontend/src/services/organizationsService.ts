import { useQuery } from "react-query"
import { OrganizationDTO } from "../models/shared_models/OrganizationDTO";
import { httpGetAsync } from "./httpClient";

export const useOrganizations = () => {
    const url = "organizations/get-organizations";
    const { data, status, isLoading } = useQuery(
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