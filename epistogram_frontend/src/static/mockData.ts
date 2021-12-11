import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO";
import { ShopCategoryDTO } from "../models/shared_models/ShopCategoryDTO";
import { getAssetUrl } from "./frontendHelpers";

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
        }, {
            icon: getAssetUrl("/course_page_icons/right_panel_sections.svg"),
            detailName: "Témakörök száma",
            detailValue: "12"
        }, {
            icon: getAssetUrl("/course_page_icons/right_panel_videos.svg"),
            detailName: "Videók száma",
            detailValue: "119"
        }, {
            icon: getAssetUrl("/course_page_icons/right_panel_questions.svg"),
            detailName: "Tudást felmérő kérdések",
            detailValue: "187"
        }, {
            icon: getAssetUrl("/course_page_icons/right_panel_language.svg"),
            detailName: "Nyelv",
            detailValue: "magyar"
        }, {
            icon: getAssetUrl("/course_page_icons/right_panel_enrolled.svg"),
            detailName: "Hányan végezték el eddig",
            detailValue: "4139"
        }, {
            icon: getAssetUrl("/course_page_icons/right_panel_updated.svg"),
            detailName: "Frissítve",
            detailValue: "2021. 11. 17."
        }
    ],
    recommendedCourses: [{
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    }, {
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    }, {
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    }, {
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    }, {
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    }, {
        title: "Kurzus 1",
        subTitle: "Kurzus 2"
    }]
}
