import React, { ReactChild, ReactNode } from "react";
import classes from "./adminDashboardList.module.scss";
import { Container } from "@mui/material";

export const AdminDashboardList = ({ children }: { children?: ReactNode }) => {
    return (
        <Container maxWidth={"xl"}
            color={"primary"}
            className={classes.adminDashboardList}>
            {children as ReactChild}
        </Container>
    ) as unknown as JSX.Element;
};
