

export type RouteSection = {
    path: string;
    isExact?: boolean;
    subRoutes: RouteSection[];
}

export const applicationRoutes = [
    {
        path: "/",
        isExact: true
    },
    {
        path: "/administration/statistics",
        isExact: true,
    }
] as RouteSection[];