import React from 'react';
import classes from './tasks.module.scss'
import {
    createStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    withStyles
} from "@material-ui/core";
import { UserTaskDTO } from '../../../../../models/UserTaskDTO';

// Further styling of MUI TableCell component

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            //backgroundColor: "#547891",
            fontSize: 16,
            fontWeight: "bold",
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

// Further styling of MUI TableRow component

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

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
    return (
        <div className={classes.tasksWrapper}>
            <TableContainer component={Paper} className={classes.tasksTableWrapper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Név</StyledTableCell>
                            <StyledTableCell>Hozzáadta</StyledTableCell>
                            <StyledTableCell>Állapot</StyledTableCell>
                            <StyledTableCell>Határidő</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tasksArray ? props.tasksArray.map((task) => (
                            <StyledTableRow key={task.name}>
                                <StyledTableCell component="th" scope="row">
                                    {task.name}
                                </StyledTableCell>
                                <StyledTableCell>{task.addedBy}</StyledTableCell>
                                {statuses.map(status => {
                                    return status.name === task.status ? <StyledTableCell>{status.displayedText}</StyledTableCell> : null
                                })}
                                <StyledTableCell>{String(new Date(task.due).toDateString())}</StyledTableCell>
                            </StyledTableRow>
                        )) : <TableRow key={"No task"}>
                            <StyledTableCell component="th">
                                {"Nincs elérhető feladat"}
                            </StyledTableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Tasks;
