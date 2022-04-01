import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { getRandomInteger } from "../../../static/frontendHelpers";
import { EpistoFont } from "../../controls/EpistoFont";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { CourseAdministartionFrame } from "./CourseAdministartionFrame";


export const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number },
) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate"
{...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <EpistoFont>
                    {`${Math.round(props.value)}%`}
                </EpistoFont>
            </Box>
        </Box>
    );
};

export const AdminCourseUserProgressSubpage = () => {
    const modules = [
        "Első lépések",
        "Ismerkedés a függvényekkel",
        "A formázás alapjai",
        "Segítség az adatkezelésben",
        "Munka másokkal",
        "Formázás felsőfokon",
        "Munka nagy mennyiségű adattal",
        "Kreatív adatábrázolás",
        "Ismerkedés a haladó funkciókkal"
    ];

    const users = [
        "Bagi Árpád",
        "Kelecsényi  György",
        "Zurinka  Gizella",
        "Dr. Vlaciu Péter",
        "Rozgonyi Péter",
        "Lukács Andrea",
        "Dr. Lepsényi Tamás",
        "Szabó Péter",
        "Mányoki Bence",
        "Benkő Erika",
        "Zwierczyk Gábor",
        "Apostagi Károly",
        "Reichenberger Krisztina",
        "Borbély Rozália",
        "Kovács Írisz"
    ];

    const gridRows = () => {

        return users.map((user, index) => {
            const userWithIndex = {
                id: index,
                userFullName: user
            };

            Object.assign(userWithIndex,
                Object.fromEntries(
                    modules.map((m, i) => [
                        `modul${i}`,
                        getRandomInteger(0, 100)
                    ])
                ));

            return userWithIndex;
        });

    };

    const gridColumns: {
        field: string,
        width: number,
        hide?: boolean,
        headerName?: string,
        renderCell?: (params: any) => any
    }[] = [
            {
                field: "id",
                width: 80,
                hide: true
            },
            {
                field: "userFullName",
                headerName: "",
                width: 220,
            }
        ];


    const columnsWithModules = modules.map((module, index) => {
        gridColumns.push({
            field: `modul${index}`,
            headerName: `${module}`,
            width: 150,
            renderCell: (params) => {
                return <CircularProgressWithLabel
                    variant="determinate"
                    style={{
                        color: params.value < 30
                            ? "var(--intenseRed)"
                            : params.value < 60 && params.value >= 30
                                ? "var(--mildOrange)"
                                : "var(--deepGreen)"
                    }}
                    value={params.value} />;
            }
        });
    });


    return <CourseAdministartionFrame>
        {/* Right side content */}
        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute
            ]}
            //onSave={handleSaveCourseAsync}
            direction="column">

            <DataGrid rows={gridRows()}
columns={gridColumns} />
        </AdminSubpageHeader>
    </CourseAdministartionFrame>;
};