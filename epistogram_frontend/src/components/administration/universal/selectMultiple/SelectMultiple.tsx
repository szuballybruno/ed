import React, {useRef} from 'react';
import classes from './selectMultiple.module.scss'
import {
    Divider,
    Fab,
    FormControl,
    FormGroup, RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {ISelectMultiple} from "./ISelectMultiple";
import {ListItemWithRadio} from "./components/ListItemWithRadioButton/ListItemWithRadioButton";
import {ListItemWithCheckbox} from "./components/ListItemWithCheckbox/ListItemWithCheckbox";


export const SelectMultiple = (props: ISelectMultiple) => {
    const formGroup = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (formGroup.current) {
            formGroup.current.scrollTop = formGroup.current.scrollHeight
        }
    }

    return <div className={classes.formWrapper}>
        <div>
            <Typography variant={"overline"}>{props.title}</Typography>
        </div>

        <TextField className={classes.filterInput} size={"small"} placeholder={"Szűrés"} variant={"outlined"} onChange={props.searchOnChange} />

        <FormControl  component="fieldset" className={classes.formControl}>
            {props.selectOne === true ? <RadioGroup className={classes.formGroup}
                                            onChange={props.checkBoxOnChange}>
                {props.inputArray[0] && props.inputArray.map((item, index: number) => <div style={{width: "100%"}}>
                        {index > 0  && <Divider style={{width: "100%"}} />}
                        <ListItemWithRadio {...props}
                                           key={index}
                                           name={item[props.nameProperty]}
                                           value={item[props.valueProperty]}
                                           checked={props.checkedItems?.includes(item[props.valueProperty])}
                                           isEditing={props.editingItems.includes(item[props.valueProperty])}  />
                    </div>
                )}
            </RadioGroup> : <FormGroup className={classes.formGroup} ref={formGroup}>
                {props.inputArray[0] && props.inputArray.map((item, index: number) => <div style={{width: "100%"}}>
                        {index > 0  && <Divider style={{width: "100%"}} />}
                        {props.editOnChange && <ListItemWithCheckbox {...props}
                                              key={item[props.valueProperty]}
                                              isEditing={props.editingItems.includes(item[props.valueProperty])}
                                              checked={props.checkedItems?.includes(item[props.valueProperty])}
                                              name={item[props.nameProperty]}
                                              value={item[props.valueProperty]}/>}
                    </div>
                )}
            </FormGroup>}
        </FormControl>

        {props.showAdd && <Fab color="primary"
             aria-label="add"
             onClick={(e) => {
                 props.addButtonOnClick && props.addButtonOnClick(e)
                 setTimeout(scrollToBottom, 200)
             }}
             style={{position: "absolute", bottom: 10, right: 25}}>
            <Add />
        </Fab>}
    </div>
};
