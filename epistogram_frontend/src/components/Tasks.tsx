import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/layout"
import { Create, MenuBook, PlayCircleFilled } from "@mui/icons-material"
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { NavLink } from "react-router-dom"
import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO"
import { TaskObjectiveType } from "../models/shared_models/types/sharedTypes"
import { EpistoButton } from "./universal/EpistoButton"

export const Tasks = (props: FlexProps & { currentTasks: CurrentTasksDTO }) => {

    const getListIcon = (objective: TaskObjectiveType) => {

        if (objective == "practise")
            return <MenuBook />

        if (objective == "continueVideo")
            return <PlayCircleFilled />

        if (objective == "exam")
            return <Create />

        throw new Error("Unknown task objective type!");
    }

    const { currentTasks, children, ...css } = props;

    return <Flex direction="column" justify="space-between" {...css}>
        <List>

            {currentTasks
                .tasks
                .map((currentTask, index) => {

                    return <ListItem key={index} button >
                        <ListItemIcon>
                            {getListIcon(currentTask.objective)}
                        </ListItemIcon>
                        <ListItemText primary={currentTask.text} secondary={currentTask.dueDate} />
                    </ListItem>
                })}
        </List>

        <EpistoButton
            style={{ marginTop: "20px" }}
            variant="outlined">
            Összes feladatom
        </EpistoButton>
    </Flex>
}