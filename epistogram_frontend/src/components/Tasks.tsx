import { Flex, FlexProps } from "@chakra-ui/layout"
import { Box } from "@chakra-ui/react"
import { Create, MenuBook, PlayCircleFilled } from "@mui/icons-material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import { dateToString } from "../frontendHelpers"
import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO"
import { TaskObjectiveType } from "../models/shared_models/types/sharedTypes"
import { EpistoButton } from "./universal/EpistoButton"

export const Tasks = (props: FlexProps & { currentTasks: CurrentTasksDTO }) => {

    const getListIcon = (objective: TaskObjectiveType) => {

        if (objective == "practise")
            return <MenuBook />

        if (objective == "continueVideo")
            return <PlayCircleFilled />

        if (objective == "exam")
            return <Create />

        // throw new Error("Unknown task objective type!");
    }

    const { currentTasks, children, ...css } = props;
    const tasks = currentTasks.tasks;

    return <Flex direction="column" justify="space-between" {...css}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">Feladat</TableCell>
                    <TableCell align="right">Felado</TableCell>
                    <TableCell align="right">Feladas datuma</TableCell>
                    <TableCell align="right">Esedekes</TableCell>
                    <TableCell align="right">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks
                    .map((task, index) => {

                        return <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                            {/* icon */}
                            <TableCell component="th" scope="row">
                                {getListIcon(task.objective)}
                            </TableCell>

                            {/* name */}
                            <TableCell component="th" scope="row">
                                {task.name}
                            </TableCell>

                            {/* created by  */}
                            <TableCell align="right">
                                {task.createdBy}
                            </TableCell>

                            {/* creation date */}
                            <TableCell align="right">{dateToString(task.creationDate)}</TableCell>

                            {/* due date */}
                            <TableCell align="right">{dateToString(task.dueDate)}</TableCell>

                            {/* status */}
                            <TableCell align="right">{task.status}</TableCell>
                        </TableRow>
                    })}
            </TableBody>
        </Table>
        {/* <List>

            {currentTasks
                .tasks
                .map((currentTask, index) => {

                    return <ListItem key={index} button >
                        <ListItemIcon>
                            {getListIcon(currentTask.objective)}
                        </ListItemIcon>
                        <ListItemText primary={currentTask.text} secondary={currentTask.dueDate} />
                    </ListItem>
                })}
        </List> */}

        <EpistoButton
            style={{ marginTop: "20px" }}
            variant="outlined">
            Összes feladatom
        </EpistoButton>
    </Flex>
}