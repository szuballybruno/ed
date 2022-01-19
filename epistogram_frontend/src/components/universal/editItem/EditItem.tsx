import React from 'react';
import classes from './editItem.module.scss'
import { TextField, Typography } from "@mui/material";
import { EpistoFont } from '../../controls/EpistoFont';

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
                <EpistoFont>{props.title}</EpistoFont>
            </div>
            <div className={classes.textOrInputWrapper}>
                {props.isEditing ?
                    <TextField
                        size={"small"}
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                    /> :
                    <EpistoFont>
                        {props.value}
                    </EpistoFont>
                }
            </div>
        </div>
    );
};

export default EditItem;
