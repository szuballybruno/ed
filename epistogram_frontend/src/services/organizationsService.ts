import { useQuery } from "react-query"
import { organizationDTO } from "../models/shared_models/OrganizationDTO";
import { httpGetAsync } from "./httpClient";

export const useOrganizations = () => {

    const url = "organizations/getorganizations";
    const { data, status, isLoading } = useQuery(
        "getOrganizations",
        async () => (await httpGetAsync(url)).data as organizationDTO[], {
        retry: false,
        refetchOnWindowFocus: false
    });

    return {
        organizations: data ?? [],
        isOrganizationsLoaded: !isLoading
    }
}