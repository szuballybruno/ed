import { DataGrid } from "@mui/x-data-grid"
import { DataGridPro, GridColDef, GridRowsProp } from "@mui/x-data-grid-pro"
import { getRandomInteger } from "../../../../static/frontendHelpers"
import { EpistoFont } from "../../../controls/EpistoFont"
import { ChipSmall } from "../../courses/ChipSmall"

export const AdminUserVideosDataGridControl = () => {
    const dummyVideos = [
        {
            id: 0,
            title: "Kezdőképernyő",
            videoLength: "1:47",
            allSpentTime: "3:10",
            replaysCount: "1.6x",
            isAnsweredCorrectly: "Igen",
            reactionTime: 11.2,
            lastWatchTime: "2022.02.12.",
        },
        {
            id: 1,
            title: "A képernyő részei",
            videoLength: "3:52",
            allSpentTime: "4:00",
            replaysCount: "0",
            isAnsweredCorrectly: "Nem",
            reactionTime: 8,
            lastWatchTime: "2022.02.12",
        },
        {
            id: 2,
            title: "Több dokumentum egyidejű kezelése",
            videoLength: "3:47",
            allSpentTime: "9:10",
            replaysCount: "2.2x",
            isAnsweredCorrectly: "Igen",
            reactionTime: 13.2,
            lastWatchTime: "2022.02.12.",
        },
        {
            id: 3,
            title: "A nagyítás lehetőségei",
            videoLength: "2:13",
            allSpentTime: "4:10",
            replaysCount: "1.9",
            isAnsweredCorrectly: "Nem",
            reactionTime: 19.2,
            lastWatchTime: "2022.02.12.",
        },
        {
            id: 4,
            title: "A prezentáció tartalma",
            videoLength: "2:22",
            allSpentTime: "2:30",
            replaysCount: "0",
            isAnsweredCorrectly: "Igen",
            reactionTime: 5.2,
            lastWatchTime: "2022.02.12.",
        },
        {
            id: 5,
            title: "A gyorselérési eszköztár használata",
            videoLength: "3:19",
            allSpentTime: "12:30",
            replaysCount: "3.8x",
            isAnsweredCorrectly: "Igen",
            reactionTime: 12.2,
            lastWatchTime: "2022.02.13.",
        },
        {
            id: 6,
            title: "A fájl menü lehetőségei",
            videoLength: "4:55",
            allSpentTime: "11:30",
            replaysCount: "2.2x",
            isAnsweredCorrectly: "Nem",
            reactionTime: 15.2,
            lastWatchTime: "2022.02.13.",
        },
        {
            id: 7,
            title: "A prezentáció mentése",
            videoLength: "2:02",
            allSpentTime: "2:02",
            replaysCount: "0",
            isAnsweredCorrectly: "Igen",
            reactionTime: 9.1,
            lastWatchTime: "2022.02.14.",
        },
        {
            id: 8,
            title: "Mentés diavetítésként",
            videoLength: "2:07",
            allSpentTime: "3:30",
            replaysCount: "1.52x",
            isAnsweredCorrectly: "Igen",
            reactionTime: 10.1,
            lastWatchTime: "2022.02.14.",
        },
        {
            id: 9,
            title: "Kattintás és húzás",
            videoLength: "4:25",
            allSpentTime: "4:25",
            replaysCount: "0",
            isAnsweredCorrectly: "Igen",
            reactionTime: 7.7,
            lastWatchTime: "2022.02.15.",
        },
        {
            id: 10,
            title: "Tartalom beillesztése",
            videoLength: "4:07",
            allSpentTime: "4:7",
            replaysCount: "0",
            isAnsweredCorrectly: "Nem",
            reactionTime: 22.2,
            lastWatchTime: "2022.02.16.",
        },

    ]

    const getRowsFromVideos = () => dummyVideos.map((video) => {
        return {
            id: video.id,
            title: video.title,
            videoLength: video.videoLength,
            allSpentTime: video.allSpentTime,
            replaysCount: video.replaysCount,
            isAnsweredCorrectly: video.isAnsweredCorrectly,
            reactionTime: video.reactionTime,
            lastWatchTime: video.lastWatchTime
        }
    })

    const videoRows: GridRowsProp = getRowsFromVideos()

    const videoColumns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Cím',
            width: 300
        },
        {
            field: 'videoLength',
            headerName: 'Videó hossz',
            width: 120,
            editable: true,
            resizable: true
        },
        {
            field: 'allSpentTime',
            headerName: 'Összes eltöltött idő', width: 150,
            resizable: true
        },
        {
            field: 'replaysCount',
            headerName: 'Ismétlések száma',
            width: 150,
            resizable: true
        },
        {
            field: 'replayRecommended',
            headerName: 'Ismétlésre ajánlott',
            width: 150,
            resizable: true,
            renderCell: () => {
                const randomNumber = getRandomInteger(0, 100)
                return <ChipSmall
                    text={`${randomNumber < 20 ? "Igen" : "Nem"}`}
                    color={randomNumber > 20 ? "var(--deepGreen)" : "var(--intenseRed)"} />
            }
        },
        {
            field: 'isAnsweredCorrectly',
            headerName: 'Helyesen válaszolt?',
            width: 150,
            resizable: true,
            renderCell: (params) =>
                <ChipSmall
                    text={params.value}
                    color={params.value === "Igen"
                        ? "var(--intenseGreen)"
                        : "var(--intenseRed)"} />
        },
        {
            field: 'reactionTime',
            headerName: 'Reakcióidő',
            width: 150,
            resizable: true,
            renderCell: (params) => <ChipSmall
                text={params.value < 10
                    ? "Átlagon felüli"
                    : params.value < 15 && params.value >= 10
                        ? "Átlagos"
                        : "Átlag alatti"}
                color={params.value < 10
                    ? "var(--deepGreen)"
                    : params.value < 15 && params.value >= 10
                        ? "var(--mildOrange)"
                        : "var(--intenseRed)"
                } />
        },
        {
            field: 'lastWatchTime',
            headerName: 'Utolsó megtekintés ideje',
            width: 150,
            resizable: true
        }
    ];
    return <DataGrid
        autoHeight
        rows={videoRows}
        columns={videoColumns} />
}