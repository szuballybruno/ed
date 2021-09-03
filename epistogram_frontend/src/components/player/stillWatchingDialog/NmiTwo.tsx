import React from 'react';
import classes from "./nmiTwo.module.scss";
import { Button, Typography } from "@material-ui/core";
import { Box } from '@chakra-ui/react';

const NmiTwo = () => {

    return <Box>WIP</Box>;
    // const user = useState(userDetailsState)
    // const app = useState(applicationRunningState)

    // const wrongAnswer = useState({
    //     0: false,
    //     1: false,
    //     2: false,
    //     3: false
    // })

    // const handleClick = (index: number) => {
    //     if (user.userData.currentItem.overlays[0].answers[index]._id.get() === user.userData.currentItem.overlays[0].validAnswer.get()) {
    //         app.shouldViewOverlay.set(false)
    //         app.shouldPlayVideo.set(true)
    //     } else {
    //         wrongAnswer[index].set(true)
    //         setTimeout(() => {
    //             wrongAnswer[index].set(false)
    //         }, 500)
    //     }
    // }
    // return (
    //     <div className={classes.modalDiv}>
    //         <div className={classes.nmiModalText}>
    //             <Typography variant={"button"}>{user.userData.currentItem.overlays[0].question.get()}</Typography>
    //         </div>
    //         <div className={classes.nmiAnswerWrapper}>
    //             <div className={classes.nmiAnswerRow}>
    //                 <Button variant={"contained"} className={classes.nmiAnswerColumn}
    //                      onClick={() => handleClick(0)}
    //                      style={{backgroundColor: wrongAnswer[0].get() ? "red" : ""}}>
    //                     {user.userData.currentItem.overlays[0].answers[0].answer.get()}
    //                 </Button>
    //                 <Button variant={"contained"} className={classes.nmiAnswerColumn}
    //                      onClick={() => handleClick(1)}
    //                      style={{backgroundColor: wrongAnswer[1].get() ? "red" : ""}}>
    //                     {user.userData.currentItem.overlays[0].answers[1].answer.get()}
    //                 </Button>
    //             </div>
    //             <div className={classes.nmiAnswerRow}>
    //                 <Button variant={"contained"} className={classes.nmiAnswerColumn}
    //                      onClick={() => handleClick(2)}
    //                      style={{backgroundColor: wrongAnswer[2].get() ? "red" : ""}}>
    //                     {user.userData.currentItem.overlays[0].answers[2].answer.get()}
    //                 </Button>
    //                 <Button variant={"contained"} className={classes.nmiAnswerColumn}
    //                      onClick={() => handleClick(3)}
    //                      style={{backgroundColor: wrongAnswer[3].get() ? "red" : ""}}>
    //                     {user.userData.currentItem.overlays[0].answers[3].answer.get()}
    //                 </Button>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default NmiTwo;
