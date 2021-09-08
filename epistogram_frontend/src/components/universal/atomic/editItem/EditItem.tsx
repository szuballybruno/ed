import React from 'react';
import classes from './editItem.module.scss'
import {TextField, Typography} from "@material-ui/core";

const EditItem = (props: {
    title: string
    className?: string

    isEditing?: boolean
    name: string
    value?: string

    nameProperty?: string
    valueProperty?: string

    onChange?: (e: React.ChangeEvent<any>) => any,
    showDeleteButton?: boolean,
    showEditButton?: boolean,
    deleteButtonOnClick?: (e: React.MouseEvent<any>) => any
    doneButtonOnClick?: (e: React.MouseEvent<any>) => any
    editButtonOnClick?: (e: React.MouseEvent<any>) => any
}) => {
    return (
        <div className={`${classes.dataSheetItem} ${props.className}`} >
            <div className={classes.dataSheetItemTitleWrapper}>
                <Typography>{props.title}</Typography>
            </div>
            <div className={classes.textOrInputWrapper}>
                {props.isEditing ?
                    <TextField
                        size={"small"}
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                    /> :
                    <Typography>
                        {props.value}
                    </Typography>
                }
            </div>
        </div>
    );
};

export default EditItem;
