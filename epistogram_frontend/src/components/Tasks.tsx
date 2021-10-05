import { Flex, FlexProps } from "@chakra-ui/layout"
import { Box } from "@chakra-ui/react"
import { Create, MenuBook, PlayCircleFilled } from "@mui/icons-material"
import { Typography } from "@mui/material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import { dateTimeToString, daysUntil, toDateStringFormatted } from "../frontendHelpers"
import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO"
import { TaskObjectiveType, TaskPriorityType, TaskStatusType } from "../models/shared_models/types/sharedTypes"
import { EpistoButton } from "./universal/EpistoButton"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DvrIcon from '@mui/icons-material/Dvr';

export const Tasks = (props: FlexProps & { currentTasks: CurrentTasksDTO }) => {

    const { currentTasks, children, ...css } = props;
    const tasks = currentTasks.tasks;

    const getListIcon = (objective: TaskObjectiveType) => {

        if (objective == "video")
            return <PlayArrowIcon />

        if (objective == "playlist")
            return <SubscriptionsIcon />

        if (objective == "course")
            return <DvrIcon />

        if (objective == "exam")
            return <AssignmentIcon />
    }

    const tableHeaderCell = {
        fontWeight: "bold"
    } as React.CSSProperties;

    const tableRowCell = {
        paddingTop: "8px",
        paddingBottom: "8px"
    } as React.CSSProperties;

    const getPriorityColor = (priority: TaskPriorityType) => {

        if (priority === "normal")
            return "var(--deepGreen)";

        if (priority === "important")
            return "var(--deepOrange)";

        return "var(--mildRed)";
    }

    const getTaskStatusText = (status: TaskStatusType) => {

        if (status === "assigned")
            return "Kiadva";

        if (status === "inProgress")
            return "Folyamatban";

        if (status === "submitted")
            return "Beadva";

        if (status === "rejected")
            return "Visszautasítva";

        if (status === "completed")
            return "Teljesítve";

        throw new Error();
    }

    const rowAling = "left";

    return <Flex direction="column" justify="space-between" {...css}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center" style={tableHeaderCell}>Feladat</TableCell>
                    <TableCell align="center" style={tableHeaderCell}>Prioritás</TableCell>
                    <TableCell align="center" style={tableHeaderCell}>Határidő</TableCell>
                    <TableCell align="center" style={tableHeaderCell}>Státusz</TableCell>
                    <TableCell align="center" style={tableHeaderCell}>Feladatot kiadta</TableCell>
                    <TableCell align="center" style={tableHeaderCell}>Kiadás dátuma</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks
                    .map((task, index) => {

                        return <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                            {/* icon */}
                            <TableCell align={rowAling} style={tableRowCell}>
                                {getListIcon(task.objective)}
                            </TableCell>

                            {/* name */}
                            <TableCell align={rowAling} style={tableRowCell}>
                                {task.name}
                            </TableCell>

                            {/* priority */}
                            <TableCell align={rowAling} style={tableRowCell}>
                                <Typography
                                    style={{
                                        color: getPriorityColor(task.priority),
                                        border: `2px solid ${getPriorityColor(task.priority)}`,
                                        borderRadius: "5px",
                                        padding: "0 5px 0 5px",
                                        width: "fit-content"
                                    }}>

                                    {task.priority === "normal"
                                        ? "Normál"
                                        : task.priority === "important"
                                            ? "Fontos"
                                            : "Sürgős"}
                                </Typography>
                            </TableCell>

                            {/* due date */}
                            <TableCell align={rowAling} style={tableRowCell}>
                                {`${toDateStringFormatted(task.dueDate)} | ${daysUntil(new Date(Date.now()), task.dueDate)} nap van hátra`}
                            </TableCell>

                            {/* status */}
                            <TableCell align={rowAling} style={tableRowCell}>
                                <Box>
                                    <Typography
                                        style={{
                                            border: "1px solid var(--mildGrey)",
                                            borderRadius: "5px",
                                            padding: "0 5px 0 5px",
                                            width: "fit-content"
                                        }}>
                                        {getTaskStatusText(task.status)}
                                    </Typography>
                                </Box>
                            </TableCell>

                            {/* created by  */}
                            <TableCell align={rowAling} style={tableRowCell}>
                                <Flex align="center">
                                    <img
                                        className="square35"
                                        src={"https://storage.googleapis.com/epistogram_bucket_dev/userAvatars/user_avatar_1.png"}
                                        style={{ marginRight: "5px", borderRadius: "50%" }} />

                                    {task.createdBy}
                                </Flex>
                            </TableCell>

                            {/* creation date */}
                            <TableCell align={rowAling} style={tableRowCell}>
                                {toDateStringFormatted(task.creationDate)}
                            </TableCell>
                        </TableRow>
                    })}
            </TableBody>
        </Table>

        <EpistoButton
            style={{ marginTop: "20px", width: "fit-content", alignSelf: "center" }}
            variant="outlined">
            Előzmények
        </EpistoButton>
    </Flex>
}