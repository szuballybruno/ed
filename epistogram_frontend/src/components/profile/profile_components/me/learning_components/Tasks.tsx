import { Box } from "@chakra-ui/react";
import {
    Paper,
    Table,
    TableBody, TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React from 'react';
import { UserTaskDTO } from '../../../../../models/shared_models/UserTaskDTO';
import classes from './tasks.module.scss';

// TODO: Migrate to language file

const statuses = [{
    name: "new",
    displayedText: "Új"
}, {
    name: "inProgress",
    displayedText: "Folyamatban"
}, {
    name: "done",
    displayedText: "Kész"
}, {
    name: "interrupted",
    displayedText: "Meghiusúlt"
}]

const Tasks = (props: {
    tasksArray?: UserTaskDTO[]
}) => {
    return (<Box></Box>
        // <div className={classes.tasksWrapper}>
        //     <TableContainer component={Paper} className={classes.tasksTableWrapper}>
        //         <Table className={classes.table} aria-label="customized table">
        //             <TableHead>
        //                 <TableRow>
        //                     <StyledTableCell>Név</StyledTableCell>
        //                     <StyledTableCell>Hozzáadta</StyledTableCell>
        //                     <StyledTableCell>Állapot</StyledTableCell>
        //                     <StyledTableCell>Határidő</StyledTableCell>
        //                 </TableRow>
        //             </TableHead>
        //             <TableBody>
        //                 {props.tasksArray ? props.tasksArray.map((task) => (
        //                     <StyledTableRow key={task.name}>
        //                         <StyledTableCell component="th" scope="row">
        //                             {task.name}
        //                         </StyledTableCell>
        //                         <StyledTableCell>{task.addedBy}</StyledTableCell>
        //                         {statuses.map(status => {
        //                             return status.name === task.status ? <StyledTableCell>{status.displayedText}</StyledTableCell> : null
        //                         })}
        //                         <StyledTableCell>{String(new Date(Date.now()).toDateString())}</StyledTableCell>
        //                     </StyledTableRow>
        //                 )) : <TableRow key={"No task"}>
        //                     <StyledTableCell component="th">
        //                         {"Nincs elérhető feladat"}
        //                     </StyledTableCell>
        //                 </TableRow>}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        // </div>
    );
};

export default Tasks;
