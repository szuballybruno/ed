import { Flex, FlexProps } from "@chakra-ui/layout"
import { Box } from "@chakra-ui/react"
import AssignmentIcon from '@mui/icons-material/Assignment'
import DvrIcon from '@mui/icons-material/Dvr'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import { Typography } from "@mui/material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import { daysUntil, toDateStringFormatted } from "../frontendHelpers"
import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO"
import { TaskObjectiveType, TaskPriorityType, TaskStatusType } from "../models/shared_models/types/sharedTypes"
import { translatableTexts } from "../translatableTexts"
import { EpistoButton } from "./universal/EpistoButton"

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
            return translatableTexts.tasks.states.assigned;

        if (status === "inProgress")
            return translatableTexts.tasks.states.inProgress;

        if (status === "submitted")
            return translatableTexts.tasks.states.submitted;

        if (status === "rejected")
            return translatableTexts.tasks.states.rejected;

        if (status === "completed")
            return translatableTexts.tasks.states.completed;

        throw new Error();
    }

    const getTaskPriorityText = (priority: TaskPriorityType) => {

        if (priority === "normal")
            return translatableTexts.tasks.priority.normal;

        if (priority === "important")
            return translatableTexts.tasks.priority.important;

        if (priority === "urgent")
            return translatableTexts.tasks.priority.urgent;

        throw new Error("Unrecognised task priority: " + priority);
    }

    const rowAling = "left";
    const headerAling = "left";

    return <Flex direction="column" justify="space-between" {...css}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align={headerAling}></TableCell>
                    <TableCell align={headerAling} style={tableHeaderCell}>{translatableTexts.tasks.taskName}</TableCell>
                    <TableCell align={headerAling} style={tableHeaderCell}>{translatableTexts.tasks.taskPriority}</TableCell>
                    <TableCell align={headerAling} style={tableHeaderCell}>{translatableTexts.tasks.taskDueDate}</TableCell>
                    <TableCell align={headerAling} style={tableHeaderCell}>{translatableTexts.tasks.taskState}</TableCell>
                    <TableCell align={headerAling} style={tableHeaderCell}>{translatableTexts.tasks.taskAssigendBy}</TableCell>
                    <TableCell align={headerAling} style={tableHeaderCell}>{translatableTexts.tasks.taskAssigendDate}</TableCell>
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

                                    {getTaskPriorityText(task.priority)}
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

            {translatableTexts.tasks.allTasksButtonLabel}
        </EpistoButton>
    </Flex>
}