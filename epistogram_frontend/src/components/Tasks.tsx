import { Create, MenuBook, PlayCircleFilled } from "@mui/icons-material"
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { NavLink } from "react-router-dom"
import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO"
import { TaskObjectiveType } from "../models/shared_models/types/sharedTypes"
import { EpistoButton } from "./universal/EpistoButton"

export const Tasks = (props: { currentTasks: CurrentTasksDTO }) => {

    const getListIcon = (objective: TaskObjectiveType) => {

        if (objective == "practise")
            return <MenuBook />

        if (objective == "continueVideo")
            return <PlayCircleFilled />

        if (objective == "exam")
            return <Create />

        throw new Error("Unknown task objective type!");
    }

    return <List>

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

        <NavLink to={"/profilom/tanulas"}>
            <EpistoButton
                variant="outlined">
                Összes feladatom
            </EpistoButton>
        </NavLink>
    </List>
}