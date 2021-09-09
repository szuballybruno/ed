export const globalConfig = {
    siteUrl: "http://localhost:3000",
    backendUrl: "http://localhost:5000/",
    verboseLogging: false,
    assetStorageUrl: "https://storage.googleapis.com/epistogram_bucket_dev",
    currentTheme: "nextGenTheme",

    adminMenuItems: [
        {
            title: "Statisztika",
            path: "/statistics"
        },
        {
            title: "Felhasználók kezelése",
            path: "/manage/users"
        },
        {
            title: "Kurzusok kezelése",
            path: "/manage/courses"
        },
        {
            title: "Csoportok kezelése",
            path: "/manage/groups"
        },
        {
            title: "Cégek kezelése",
            path: "/manage/organizations"
        }
    ]
}
