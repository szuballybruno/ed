import React from "react";
import {ListItem as MUIListItem} from "@material-ui/core";
import {TextOrInput} from "../TextOrInput/TextOrInput";

export const ListItems = () => (props: {
    key: any,
    isEditing?: boolean
    showCheckBox?: boolean
    checked?: boolean
    onChange: (e: React.ChangeEvent<any>) => any,
    editOnChange: (e: React.ChangeEvent<any>) => any,
    doneButtonOnClick?: (e: React.MouseEvent<any>) => any
    name: string
    value?: string
}) => <MUIListItem key={props.key}
                   dense
                   button>
    <TextOrInput {...props} />
</MUIListItem>