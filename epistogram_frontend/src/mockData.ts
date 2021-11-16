import { CurrentTasksDTO } from "./models/shared_models/CurrentTasksDTO";
import {ShopItemShortDTO} from "./models/shared_models/ShopItemShortDTO";
import {ShopCategoryDTO} from "./models/shared_models/ShopCategoryDTO";
import {getAssetUrl} from "./frontendHelpers";

export const mockTasks = {
    tasks: [
        {
            objective: "video",
            name: "Elme karbantartása",
            createdBy: "Spengler Manfréd",
            status: "assigned",
            creationDate: new Date(2021, 8, 27),
            dueDate: new Date(2021, 10, 15),
            priority: "normal"
        },
        {
            objective: "playlist",
            name: "Gravitációs normák kisimítása",
            createdBy: "Spengler Manfréd",
            status: "inProgress",
            creationDate: new Date(2021, 9, 1),
            dueDate: new Date(2021, 10, 24),
            priority: "important"
        },
        {
            objective: "course",
            name: "Összefoglaló írása az office kurzusból",
            createdBy: "Spengler Manfréd",
            status: "submitted",
            creationDate: new Date(2021, 9, 10),
            dueDate: new Date(2021, 10, 30),
            priority: "urgent"
        },
        {
            objective: "exam",
            name: "Új barátok szerzése",
            createdBy: "Spengler Manfréd",
            status: "rejected",
            creationDate: new Date(2021, 9, 2),
            dueDate: new Date(2021, 11, 3),
            priority: "normal"
        },
        {
            objective: "video",
            name: "Epistogram kihasználása, maximális szinten",
            createdBy: "Spengler Manfréd",
            status: "completed",
            creationDate: new Date(2021, 9, 6),
            dueDate: new Date(2021, 11, 7),
            priority: "normal"
        }
    ]
} as CurrentTasksDTO;

export const mockShopItems = [
    {
        shopItemId: 1,
        title: "Xiaomi Mi Router 4 Pro Gigabit Dual-Band 1317Mbps 2.4G/5.0GHz Vezeték nélküli router",
        thumbnailImageURL: getAssetUrl("/images/SHOProuter.png"),
        categoryName: "Fizikai termékek",
        priceInEpistoCoin: 3900,
        priceInHUF: 8000
    },

    {
        shopItemId: 5,
        title: "Fractal design prémium gépház",
        thumbnailImageURL: getAssetUrl("/images/SHOPgephaz.png"),
        categoryName: "Fizikai termékek",
        priceInEpistoCoin: 29000,
        priceInHUF: 0
    },

    {
        shopItemId: 3,
        title: "Google Ads Mesterkurzus Kissné Tóth Erával a Googletől",
        thumbnailImageURL: getAssetUrl("/images/SHOPads.png"),
        categoryName: "Prémium kurzusok",
        priceInEpistoCoin: 13000,
        priceInHUF: 0
    },

    {
        shopItemId: 2,
        title: "Office 365 Pro családi előfizetés csomag 1 évre, maximum 5 felhasználóig",
        thumbnailImageURL: getAssetUrl("/images/SHOPoffice.png"),
        categoryName: "Szoftverek, játékok",
        priceInEpistoCoin: 9900,
        priceInHUF: 89000
    },

    {
        shopItemId: 4,
        title: "iPad Pro 2021 128 GB WIFI, Silver",
        thumbnailImageURL: getAssetUrl("/images/SHOPipad.png"),
        categoryName: "Fizikai termékek",
        priceInEpistoCoin: 49000,
        priceInHUF: 100000
    },

    {
        shopItemId: 6,
        title: "Lenovo YOGA vezeték nélküli egér",
        thumbnailImageURL: getAssetUrl("/images/SHOPeger.png"),
        categoryName: "Prémium kurzusok",
        priceInEpistoCoin: 8000,
        priceInHUF: 3000
    }
] as ShopItemShortDTO[]

export const mockShopCategories = [
    {id: 1, name: "Prémium kurzusok"},
    {id: 2, name: "Szoftverek, játékok"},
    {id: 3, name: "Fizikai termékek"},
    {id: 4, name: "Digitális művészet - NFT"},
    {id: 5, name: "Élmény csomagok"},
    {id: 6, name: "Egyéb kedvezmények"}

] as ShopCategoryDTO[]

export const mockNotifications = [
    {
        id: 1,
        title: "Megjelent egy új kurzus",
        timestamp: Date.now()
    }, {
        id: 2,
        title: "Megjelent egy új kurzus",
        timestamp: Date.now()
    }
]
