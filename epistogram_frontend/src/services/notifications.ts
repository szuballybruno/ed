import { useState } from "@hookstate/core";
import applicationRunningState from "../store/application/applicationRunningState";

export type NotificationType = "error" | "info" | "warning";

export const useShowNotification = () => {

    const app = useState(applicationRunningState);

    return (text: string, type?: NotificationType) => {

        app.snack.snackTitle.set(text);
        app.snack.showSnack.set(true);
    }
}