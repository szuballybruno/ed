import { CurrentTasksDTO } from "./models/shared_models/CurrentTasksDTO";
import {ShopItemShortDTO} from "./models/shared_models/ShopItemShortDTO";
import {ShopCategoryDTO} from "./models/shared_models/ShopCategoryDTO";
import {getAssetUrl} from "./frontendHelpers";

/**
 * Tasks
 */

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

/**
 * Shop
 */

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
        shopItemId: 2,
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
        shopItemId: 4,
        title: "Office 365 Pro családi előfizetés csomag 1 évre, maximum 5 felhasználóig",
        thumbnailImageURL: getAssetUrl("/images/SHOPoffice.png"),
        categoryName: "Szoftverek, játékok",
        priceInEpistoCoin: 9900,
        priceInHUF: 89000
    },

    {
        shopItemId: 5,
        title: "iPad Pro 2021 128 GB WIFI, Silver",
        thumbnailImageURL: getAssetUrl("/images/SHOPipad.png"),
        categoryName: "Fizikai termékek",
        priceInEpistoCoin: 49000,
        priceInHUF: 100000
    },
    {
        shopItemId: 6,
        title: "12 hónapos PCWorld előfizetés",
        thumbnailImageURL: getAssetUrl("/images/SHOPpcworld.png"),
        categoryName: "Fizikai termékek",
        priceInEpistoCoin: 10000,
        priceInHUF: 9800
    },
    {
        shopItemId: 7,
        title: "Exkluzív borkóstolás Egerben, 2 főre",
        thumbnailImageURL: getAssetUrl("/images/SHOPkostolas.png"),
        categoryName: "Élmény csomagok",
        priceInEpistoCoin: 8000,
        priceInHUF: 12000
    },

    {
        shopItemId: 8,
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

/**
 * Notifications
 */

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

/**
 * CourseDetails
 */

export const mockCourseDetails = {
    lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur.\n" +
        "\n" +
        "Maecenas risus sem, pharetra eu magna vel, gravida luctus urna. Sed diam urna, blandit id justo a, consectetur lacinia risus. Donec porttitor, sem vitae posuere lacinia, mauris libero sagittis dui, non viverra purus lectus ut urna. Pellentesque semper, eros ac maximus vehicula, orci odio tempor magna, vel rutrum nisi nisl id mauris. Cras ullamcorper lacus elementum venenatis feugiat. Donec magna dui, vulputate ac massa ut, placerat imperdiet mauris. Fusce pellentesque ipsum nunc, eu lobortis libero porttitor id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc tempor euismod erat, finibus commodo felis mollis a. Ut rhoncus convallis sem, in varius tortor dapibus et. Donec ultricies accumsan neque, eget bibendum ante fringilla sed.\n",

    shortLorem: "Lorem ipsum dolor sit amet",

    upperOverviewBelowTitle: "Formázások, képletek, függvények. Sokunk számára már rájuk gondolni is kellemetlen, dolgozni, pedig végképp nem szeretnénk velük.\n" +
        "Office tanfolyamsorozatunk oszlopos tagjaként Excel kurzusunk sallangmentesen, és mindenki számára közérthetően segít megérteni,\n" +
        "hogyan használhatjuk hatékonyan a Microsoft zöld táblázatkezelőjét.",
    overviewSectionShortDescription: "Excel alapozó kurzusunk egészen az alapoktól mutatja be a program működését. Részletesen ismerheted meg a különböző menüpontokat, elrendezéseket, majd a munkaterület feltérképezése után az alapvető műveletek elvégzésének kezdhetsz neki.\n" +
        "\n" +
        "A formázások elsajátítása után a függvények tárházával ismerkedhetsz meg, melyek hatalmas segítséget jelentenek bonyolultnak tűnő feladatok szempillantás alatt való megoldásában, és a különböző képek, alakzatok beszúrását is elsajátíthatod.\n" +
        "\n" +
        "Az Excel rendkívül erős társad lehet egy-egy adat, kimutatás, riport prezentálásában is, elengedhetetlen tehát, hogy az ehhez illő diagramokat, grafikonokat is mesterien kezeld.",
    whatCanYouLearnFromCourseList: [
        "Táblázatok, munkalapok kezelése",
        "Alapvető műveletek elvégzése",
        "Függvényekkel való munkavégzés",
        "Grafikai elemek használata",
        "Riportok készítése",
        "Grafikonok és diagramok létrehozása"
    ],
    whatSkillsTheCourseImprovingDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur. Maecenas risus sem, pharetra eu magna vel, gravida luctus urna. Sed diam urna, blandit id justo a, consectetur lacinia risus.",

    teacherNameShort: "OM",

    briefingInfoItemValues: {
        teacherName: "Oláh Mihály",
        difficulty: "6.9/10 pont",
        learningExperience: "4.5/5.0 pont"
    },

    shortCourseDetails: [
        {
            icon: getAssetUrl("/course_page_icons/right_panel_course_lenght.svg"),
            detailName: "Kurzus hossza",
            detailValue: "4h 12m"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_sections.svg"),
            detailName: "Témakörök száma",
            detailValue: "12"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_videos.svg"),
            detailName: "Videók száma",
            detailValue: "119"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_questions.svg"),
            detailName: "Tudást felmérő kérdések",
            detailValue: "187"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_language.svg"),
            detailName: "Nyelv",
            detailValue: "magyar"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_enrolled.svg"),
            detailName: "Hányan végezték el eddig",
            detailValue: "4139"
        },{
            icon: getAssetUrl("/course_page_icons/right_panel_updated.svg"),
            detailName: "Legutolsó frissítés dátuma",
            detailValue: "2021. 11. 14."
        }
    ],
    recommendedCourses: [{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    },{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    }]
}
