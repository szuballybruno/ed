import React from 'react';
import classes from "./nmiTwo.module.scss";
import { Button, Typography } from "@material-ui/core";
import { Box, Flex } from '@chakra-ui/react';

export const Questionnaire = () => {

    return (
        <Flex direction="column">
            <div className={classes.nmiModalText}>
                <Typography variant={"button"}>{user.userData.currentItem.overlays[0].question.get()}</Typography>
            </div>
            <div className={classes.nmiAnswerWrapper}>
                <div className={classes.nmiAnswerRow}>
                    <Button variant={"contained"} className={classes.nmiAnswerColumn}
                        onClick={() => handleClick(0)}
                        style={{ backgroundColor: wrongAnswer[0].get() ? "red" : "" }}>
                        {user.userData.currentItem.overlays[0].answers[0].answer.get()}
                    </Button>
                    <Button variant={"contained"} className={classes.nmiAnswerColumn}
                        onClick={() => handleClick(1)}
                        style={{ backgroundColor: wrongAnswer[1].get() ? "red" : "" }}>
                        {user.userData.currentItem.overlays[0].answers[1].answer.get()}
                    </Button>
                </div>
                <div className={classes.nmiAnswerRow}>
                    <Button variant={"contained"} className={classes.nmiAnswerColumn}
                        onClick={() => handleClick(2)}
                        style={{ backgroundColor: wrongAnswer[2].get() ? "red" : "" }}>
                        {user.userData.currentItem.overlays[0].answers[2].answer.get()}
                    </Button>
                    <Button variant={"contained"} className={classes.nmiAnswerColumn}
                        onClick={() => handleClick(3)}
                        style={{ backgroundColor: wrongAnswer[3].get() ? "red" : "" }}>
                        {user.userData.currentItem.overlays[0].answers[3].answer.get()}
                    </Button>
                </div>
            </div>
        </Flex>
    );
}