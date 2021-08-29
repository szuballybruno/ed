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
import React, { ReactNode } from 'react';
import { Line } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import { CurrentTasksDTO } from "../../../../models/shared_models/CurrentTasksDTO";
import { OverviewPageDTO } from "../../../../models/shared_models/OverviewPageDTO";
import { QuestionDTO } from "../../../../models/shared_models/QuestionDTO";
import { TaskObjectiveType } from "../../../../models/shared_models/types/sharedTypes";
import classes from "./overviewDashboard.module.scss";

const AssistantGridItem = (props: { children: ReactNode, title: string, xs: any }) => {

    return <Grid item xs={props.xs} className={classes.testItemWrapper}>
        <Typography variant={"overline"} className={classes.smallBlockTitle}>{props.title}</Typography>
        <Paper className={classes.testKnowledgePaper}>
            {props.children}
        </Paper>
    </Grid>
}

const TestYourKnowledge = (props: { dto: QuestionDTO }) => {

    const dto = props.dto;

    return (
        <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
            <div className={classes.nmiModalText}>
                <Typography variant={"button"}>{dto.questionText}</Typography>
            </div>
            <div className={classes.nmiAnswerWrapper}>
                <div className={classes.nmiAnswerRow}>
                    <Button variant={"contained"} className={classes.nmiAnswerColumn}
                        onClick={() => { }}>
                        {dto.answers[0].answerText}
                    </Button>
                    <Button variant={"contained"} className={classes.nmiAnswerColumn}
                        onClick={() => { }}>
                        {dto.answers[1].answerText}
                    </Button>
                </div>
                <div className={classes.nmiAnswerRow}>
                    <Button variant={"contained"} className={classes.nmiAnswerColumn}
                        onClick={() => { }}>
                        {dto.answers[2].answerText}
                    </Button>
                    <Button variant={"contained"} className={classes.nmiAnswerColumn}
                        onClick={() => { }}>
                        {dto.answers[3].answerText}
                    </Button>
                </div>
            </div>
        </div>);
}

const DevelopmentLineChart = (props: { data: any }) => {

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

    return <Line className={classes.progressLineChart}
        options={options}
        type={"line"}
        data={props.data} />
}

const TasksView = (props: { currentTasks: CurrentTasksDTO }) => {

    const getListIcon = (objective: TaskObjectiveType) => {

        if (objective == "practise")
            return <MenuBook />

        if (objective == "continueVideo")
            return <PlayCircleFilled />

        if (objective == "exam")
            return <Create />

        throw new Error("Unknown task objective type!");
    }

    return <List className={classes.tasksList}>

        {props
            .currentTasks
            .tasks
            .map((currentTask, index) => {

                return <ListItem key={index} button >
                    <ListItemIcon>
                        {getListIcon(currentTask.objective)}
                    </ListItemIcon>
                    <ListItemText primary={currentTask.text} secondary={currentTask.dueDate} />
                </ListItem>
            })}

        <NavLink className={classes.allTasksButtonLink} to={"/profilom/tanulas"}>
            <Button variant={"outlined"}
                className={classes.allTasksButton}
                size={"small"}>Összes feladatom</Button>
        </NavLink>
    </List>
}

export const OverviewDashboard = (props: { dto: OverviewPageDTO }) => {

    const { developmentChartData, testQuestionDTO, currentTasks } = props.dto;

    return <div className={classes.assistantWrapper}>
        <Grid container spacing={1} style={{ flexDirection: "row" }}>

            {/* test your knowledge */}
            <AssistantGridItem title="Teszteld a tudásod" xs={8}>
                <TestYourKnowledge dto={testQuestionDTO}></TestYourKnowledge>
            </AssistantGridItem>

            {/* current tasks */}
            <AssistantGridItem title="Feladataim" xs={4}>
                <TasksView currentTasks={currentTasks} />
            </AssistantGridItem>
        </Grid>
        <Grid container spacing={1}>

            {/* tip of the day */}
            <Grid item xs={12} className={classes.tipItemWrapper}>
                <Typography variant={"overline"} className={classes.smallBlockTitle}>Személyes tanulási tipped a mai napra</Typography>
                <Grid item xs={12} justify={"center"} alignItems={"center"} className={classes.tipOfTheDayWrapper}>
                    <Typography variant={"h6"}>Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!</Typography>
                </Grid>
            </Grid>
        </Grid>

        <Grid container spacing={1}>

            {/* Development graph */}
            <AssistantGridItem title="Fejlődési görbém az elmúlt 90 napban" xs={12}>
                <DevelopmentLineChart data={developmentChartData} />
            </AssistantGridItem>
        </Grid>
    </div>
};