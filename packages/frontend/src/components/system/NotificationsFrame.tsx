import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const NotificationsFrame = (props: { children: ReactNode }) => {

    return <>
        {props.children}
        <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
    </>;

    // function SlideTransition(props: TransitionProps) {
    //     return <Slide {...props} direction="right" />;
    // }

    /* app.alert.alertType.get() === "stopCourse" ? stopExam : redirectToCourseSearch*/
    // return (
    //     <div className={classes.snackbarWrapper}>
    //         <Snackbar
    //             className={classes.snackbar}
    //             anchorOrigin={{
    //                 vertical: 'bottom',
    //                 horizontal: 'left',
    //             }}
    //             open={app.snack.showSnack.get()}
    //             autoHideDuration={6000}
    //             onClose={() => {
    //                 app.snack.showSnack.set(false)
    //             }}
    //             TransitionComponent={SlideTransition}
    //             message={app.snack.snackTitle.get()}
    //             action={
    //                 <React.Fragment>
    //                     {app.snack.showSnackButton.get() ? <Button color="secondary" size="small" onClick={() => { }}>
    //                         Visszavonás
    //                     </Button> : null}
    //                     <IconButton size="small" aria-label="close" color="inherit" onClick={() => { app.snack.showSnack.set(false) }}>
    //                         <CloseTwoTone fontSize="small" />
    //                     </IconButton>
    //                 </React.Fragment>
    //             } />
    //         {props.children}
    //     </div>
    // );
};
