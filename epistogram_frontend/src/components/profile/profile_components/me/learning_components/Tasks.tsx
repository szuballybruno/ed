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

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const Tasks = (props: {
    tasksArray?: {
        name: string,
        addedBy: string,
        status: string,
        due: string
    }[]
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
                                <StyledTableCell>{task.status}</StyledTableCell>
                                <StyledTableCell>{String(new Date(task.due))}</StyledTableCell>
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
