import { Box } from '@chakra-ui/react';
import React from 'react';

export const AddVideo = () => {

    return <Box>WIP</Box>;
    // const admin = useState(adminSideState)
    // const user = useState(userDetailsState)
    // const app = useState(applicationRunningState)

    // const history = useHistory()
    // const [file, setFile] = React.useState<string | Blob>("")
    // const cookies = new Cookies()

    // const submitHandler = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    //     e.preventDefault();
    //     let formdata =  new FormData(e.currentTarget)
    //     //formdata.append('file', file)
    //     formdata.set('firstName', admin.currentlyEdited.user.firstName.get())
    //     formdata.set('lastName', admin.currentlyEdited.user.lastName.get())
    //     formdata.set('username', admin.currentlyEdited.user.username.get())
    //     formdata.set('email', admin.currentlyEdited.user.email.get())
    //     formdata.set('role', admin.currentlyEdited.user.role.get())
    //     formdata.set('organizationId', cookies.get("organizationId"))

    //     instance.post("users", formdata).then((res) => {
    //         if (res.status === 201) {
    //             app.snack.snackTitle.set("Felhasználó sikeresen hozzáadva")
    //             app.snack.showSnack.set(true)

    //             return <Redirect to={"/admin/manage/users"} />
    //         }
    //     }).catch((e) => {
    //         app.snack.snackTitle.set("Felhasználó hozzáadása sikertelen " + e)
    //         app.snack.showSnack.set(true)
    //     })
    // }
    // const unblockHandle = useRef<any>();

    // function stopEditing() {
    //     if (unblockHandle) {
    //         app.alert.showAlert.set(false)
    //         unblockHandle.current()
    //     }
    //     history.push(app.alert.targetLocation.get())
    //     // navigate to some other page or do some routing action now
    //     // history.push("/any/other/path")
    // }

    // function continueEditing() {
    //     if (unblockHandle) {
    //         app.alert.showAlert.set(false)
    //     }
    //     // navigate to some other page or do some routing action now
    //     // history.push("/any/other/path")
    // }

    // return <DialogFrame firstButtonOnClick={continueEditing} secondButtonOnClick={stopEditing}>
    //     <AddFrame submitHandler={submitHandler}
    //               title={"Új felhasználó hozzáadása"}>


    //         <Button className={classes.submitButton}
    //                 type={"submit"}
    //                 variant={"outlined"}
    //                 color={"secondary"}>
    //             Feltöltés
    //         </Button>
    //     </AddFrame>
    // </DialogFrame>
};