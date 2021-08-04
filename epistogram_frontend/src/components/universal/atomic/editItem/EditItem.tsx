import React from 'react';
import classes from './editItem.module.scss'
import {CloseTwoTone, DoneTwoTone, EditTwoTone} from "@material-ui/icons";
import {useState} from "@hookstate/core";
import {FormControl, Select, TextField, Typography} from "@material-ui/core";
import {TextOrInput} from "../../../administration/universal/selectMultiple/components/TextOrInput/TextOrInput";

const EditItem = (props: {
    title: string
    className?: string
    inputArray?: {[itemValue: string]: any}[],

    isEditing?: boolean
    name: string
    value?: string

    nameProperty?: string
    valueProperty?: string

    editOnChange?: (e: React.ChangeEvent<any>) => any,
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
            {props.inputArray ? <FormControl className={classes.formControl}>
                <Select
                    className={classes.select}
                    native
                    value={props.value}
                    onChange={props.editOnChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                    }}
                >
                    {props.inputArray.map((listItem) => {
                        return <option value={listItem.value}>{listItem.name}</option>
                    })}
                </Select>
            </FormControl> : <TextOrInput {...props} />}
        </div>
    );
};

export default EditItem;
