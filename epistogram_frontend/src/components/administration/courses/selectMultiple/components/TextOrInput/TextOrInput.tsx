import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Delete, Done, Edit } from "@mui/icons-material";
import classes from './textOrInput.module.scss'

export const TextOrInput = (props: {
    isEditing?: boolean
    name: string
    value?: string
    editOnChange?: (e: React.ChangeEvent<any>) => any,
    showDeleteButton?: boolean,
    showEditButton?: boolean,
    deleteButtonOnClick?: (e: React.MouseEvent<any>) => any
    doneButtonOnClick?: (e: React.MouseEvent<any>) => any
    editButtonOnClick?: (e: React.MouseEvent<any>) => any
}) => <div className={classes.textOrInputWrapper}>
        <TextField size={"small"}
            name={props.value}
            value={props.name}
            onChange={props.editOnChange} />
        <div className={classes.buttonsWrapper}>
            {props.showDeleteButton && <Button value={props.value}
                name={props.name}
                onClick={props.deleteButtonOnClick}>
                <Delete />
            </Button>}
            {props.showEditButton && <Button value={props.value}
                name={props.name}
                onClick={props.doneButtonOnClick}>
                <Done />
            </Button>}
        </div>
    </div>