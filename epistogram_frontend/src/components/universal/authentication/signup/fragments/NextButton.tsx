import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import React from "react";

export const NextButton = (
    props: {
        to?: string,
        onClick: (e: React.MouseEvent<any>) => void
        buttonTitle: string
        type: "button" | "submit" | "reset" | undefined
    }) => props.to ?
    <Button variant={"outlined"}
            onClick={props.onClick}
            type={props.type}>
        <NavLink to={props.to}>
            {props.buttonTitle}
        </NavLink>
    </Button> :  <Button variant={"outlined"}
                      onClick={props.onClick}
                      type={props.type}>
    {props.buttonTitle}
</Button>