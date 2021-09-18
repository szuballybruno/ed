import classes from './userTasks.module.scss'
import Tasks from "../../../profile/profile_components/me/learning_components/Tasks";
import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { AdminPageUserDTO } from '../../../../models/shared_models/AdminPageUserDTO';

const UserTasks = (props: { user: AdminPageUserDTO, index: number }) => {
    return (
        <div className={classes.userTasksWrapper}>
            <Tasks tasksArray={props.user.tasks} />
            <Fab color="primary"
                aria-label="add"
                style={{ position: "absolute", bottom: 45, right: 45 }}>
                <Add />
            </Fab>
        </div>
    );
};

export default UserTasks;
