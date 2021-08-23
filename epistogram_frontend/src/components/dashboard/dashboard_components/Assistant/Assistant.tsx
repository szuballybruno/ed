import { useState } from "@hookstate/core";
import {
    Button, Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from "@material-ui/core";
import { Create, MenuBook, PlayCircleFilled } from "@material-ui/icons";
import React from 'react';
import { Line } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import userDetailsState from "../../../../store/user/userSideState";
import classes from "./assistant.module.scss";

export const Assistant = () => {

    const user = useState(userDetailsState)

    const data = {
        labels: ['30 nap', '45 nap', '60 nap', '75 nap', '90 nap'],
        datasets: [
            {
                label: 'Epistogram',
                data: [12, 19, 12, 17, 8],
                fill: false,
                backgroundColor: 'rgb(63,178,181)',
                borderColor: 'rgba(13,104,140,0.2)',
                tension: 0.5
            }, {
                label: 'Hagyományos tréningek',
                data: [3, 5, 4, 5, 2],
                fill: false,
                backgroundColor: 'rgb(215,33,163)',
                borderColor: 'rgba(139,0,155,0.2)',
                tension: 0.5
            }
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return <div className={classes.assistantWrapper}>
        <Grid container spacing={1}>
            <Grid item xs={8} className={classes.testItemWrapper}>
                <Typography variant={"overline"} className={classes.smallBlockTitle}>Teszteld a tudásod</Typography>
                <Paper className={classes.testKnowledgePaper}>
                    <div className={classes.nmiModalText}>
                        <Typography variant={"button"}>{user.userData.currentItem.overlays[0].question.get()}</Typography>
                    </div>
                    <div className={classes.nmiAnswerWrapper}>
                        <div className={classes.nmiAnswerRow}>
                            <Button variant={"contained"} className={classes.nmiAnswerColumn}
                                onClick={() => { }}>
                                {user.userData.currentItem.overlays[0].answers[0].answer.get()}
                            </Button>
                            <Button variant={"contained"} className={classes.nmiAnswerColumn}
                                onClick={() => { }}>
                                {user.userData.currentItem.overlays[0].answers[1].answer.get()}
                            </Button>
                        </div>
                        <div className={classes.nmiAnswerRow}>
                            <Button variant={"contained"} className={classes.nmiAnswerColumn}
                                onClick={() => { }}>
                                {user.userData.currentItem.overlays[0].answers[2].answer.get()}
                            </Button>
                            <Button variant={"contained"} className={classes.nmiAnswerColumn}
                                onClick={() => { }}>
                                {user.userData.currentItem.overlays[0].answers[3].answer.get()}
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={4} className={classes.tasksItemWrapper}>
                <Typography variant={"overline"} className={classes.smallBlockTitle}>Feladataim</Typography>
                <Paper className={classes.tasks}>
                    <List className={classes.tasksList}>
                        <ListItem button>
                            <ListItemIcon>
                                <MenuBook />
                            </ListItemIcon>
                            <ListItemText primary="Office kurzus gyakorlása" secondary={"2021.06.19."} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <PlayCircleFilled />
                            </ListItemIcon>
                            <ListItemText primary="PHP videók megtekintése" secondary={"2021.06.19."} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Create />
                            </ListItemIcon>
                            <ListItemText primary="Word kurzus végi vizsga" secondary={"2021.06.19."} />
                        </ListItem>
                        <NavLink className={classes.allTasksButtonLink} to={"/profilom/tanulas"}>
                            <Button variant={"outlined"}
                                className={classes.allTasksButton}
                                size={"small"}>Összes feladatom</Button>
                        </NavLink>
                    </List>
                </Paper>
            </Grid>
        </Grid>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.tipItemWrapper}>
                <Typography variant={"overline"} className={classes.smallBlockTitle}>Személyes tanulási tipped a mai napra</Typography>
                <Grid item xs={12} justify={"center"} alignItems={"center"} className={classes.tipOfTheDayWrapper}>
                    <Typography variant={"h6"}>Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid container spacing={1}>
            <Grid item xs={12} className={classes.testItemWrapper}>
                <Typography variant={"overline"} className={classes.smallBlockTitle}>Fejlődési görbém az elmúlt 90 napban</Typography>
                <Paper className={classes.progressLineChartPaper}>
                    <Line className={classes.progressLineChart}
                        options={options}
                        type={"line"}
                        data={data} />
                </Paper>
            </Grid>
        </Grid>
    </div>
};