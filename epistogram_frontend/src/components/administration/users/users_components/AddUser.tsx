import React, {useEffect, useRef} from 'react';

import classes from "./addUser.module.scss";

import {useState} from "@hookstate/core";
import adminSideState from "../../../../store/admin/adminSideState";

import instance from "../../../../services/axiosInstance";
import DoubleInputs from "../../universal/twoInputs/DoubleInputs";
import SingleInput from "../../universal/singleInput/SingleInput";
import SelectFromArray from "../../universal/selectFromArray/SelectFromArray";
import ProfileImage from "../../../universal/atomic/profileImage/ProfileImage";
import {Cookies} from "react-cookie";
import userSideState from "../../../../store/user/userSideState";
import {Redirect, useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import {AddFrame} from "../../../../HOC/add_frame/AddFrame";
import {DialogFrame} from "../../../../HOC/dialog_frame/DialogFrame";

const AddUser = () => {
    const admin = useState(adminSideState)
    const user = useState(userSideState)
    const app = useState(applicationRunningState)
    const cookies = new Cookies()

    const history = useHistory()

    const [file, setFile] = React.useState<string | Blob>("")
    //const hiddenFileInput: React.MutableRefObject<any> = useRef();

    const organizations = useState<{
        optionText: string,
        optionValue: string
    }[]>([{
        optionText: "",
        optionValue: ""
    }])

    const roles = [{
        optionText: "Adminisztrátor",
        optionValue: "admin"
    },{
        optionText: "Vezető",
        optionValue: "owner"
    }, {
        optionText: "Csoportvezető",
        optionValue: "supervisor"
    },{
        optionText: "Felhasználó",
        optionValue: "user"
    }]

    useEffect(() => {
        instance.get("organizations/getorganizations").then((res) => {
            if (res.status === 200) {
                res.data.map((data: {
                    _id: string,
                    organizationName: string
                }, index: number) => {
                    organizations[index].optionValue.set(data._id)
                    return organizations[index].optionText.set(data.organizationName)
                })
            } else {
                console.log("fasd")
            }

        }).catch((e) => {
            console.log(e)
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputChangeHandler = (e: React.ChangeEvent<{ value: unknown, name?: string }>) => {
        admin.currentlyEdited.user[e.currentTarget.name as keyof typeof admin.currentlyEdited.user].set(e.currentTarget.value as string)
    }

    const unblockHandle = useRef<any>();

    useEffect(() => {
        unblockHandle.current = history.block((targetLocation: any) => {
            // take some custom action here
            // i chose to show my custom modal warning user froim going back
            // rather than relying on the browser's alert
            app.alert.set({
                showAlert: true,
                targetLocation: targetLocation.pathname,
                alertTitle: "Biztosan megszakítod a felhasználó hozzáadását?",
                alertDescription: "Megszakítás esetén a beírt adatok elvesznek.",
                showFirstButton: true,
                firstButtonTitle: "Folytatom",
                showSecondButton: true,
                secondButtonTitle: "Megszakítom"
            })
            return false;
        });
        return function () {
            unblockHandle.current.current && unblockHandle.current.current()
        }
    })


    function stopEditing() {
        if (unblockHandle) {
            app.alert.showAlert.set(false)
            unblockHandle.current()
        }
        history.push(app.alert.targetLocation.get())
        // navigate to some other page or do some routing action now
        // history.push("/any/other/path")
    }

    function continueEditing() {
        if (unblockHandle) {
            app.alert.showAlert.set(false)
        }
        // navigate to some other page or do some routing action now
        // history.push("/any/other/path")
    }


    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
            e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
    };

    const submitHandler = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        e.preventDefault();
        let formdata =  new FormData(e.currentTarget)
        formdata.append('file', file)
        formdata.set('firstName', admin.currentlyEdited.user.firstName.get())
        formdata.set('lastName', admin.currentlyEdited.user.lastName.get())
        formdata.set('username', admin.currentlyEdited.user.username.get())
        formdata.set('email', admin.currentlyEdited.user.email.get())
        formdata.set('role', admin.currentlyEdited.user.role.get())
        formdata.set('organizationId', cookies.get("organizationId"))

        instance.post("users", formdata).then((res) => {
            if (res.status === 201) {
                app.snack.snackTitle.set("Felhasználó sikeresen hozzáadva")
                app.snack.showSnack.set(true)

                return <Redirect to={"/admin/manage/users"} />
            }
        }).catch((e) => {
            app.snack.snackTitle.set("Felhasználó hozzáadása sikertelen " + e)
            app.snack.showSnack.set(true)
        })
    }

    return <DialogFrame firstButtonOnClick={continueEditing} secondButtonOnClick={stopEditing} className={classes.dialogFrameWrapper}>
        <AddFrame submitHandler={submitHandler}
                  title={"Új felhasználó hozzáadása"}>
            <ProfileImage showSelectButton={true}
                          onChange={(e) => {
                              if (e.currentTarget.files) {
                                  admin.currentlyEdited.user.uploadedFileUrl.set(URL.createObjectURL(e.currentTarget.files[0]));
                                  setFile(e.currentTarget.files[0])
                              }
                          }}
                          imageUrl={admin.currentlyEdited.user.uploadedFileUrl.get()}/>

            <DoubleInputs firstLabelText={"Vezetéknév"}
                          secondLabelText={"Keresztnév"}
                          firstLabelName={"lastName"}
                          secondLabelName={"firstName"}
                          changeHandler={inputChangeHandler}/>
            <SingleInput labelText={"Felhasználónév"} name={"username"} changeHandler={inputChangeHandler} />
            <SingleInput labelText={"E-mail"} name={"email"} changeHandler={inputChangeHandler} />
            {user.userData.role.get() === "admin" ? <SelectFromArray labelText={"Cég"}
                                                                     showNull
                                                                     name={"organizationId"}
                                                                     value={admin.currentlyEdited.user.organizationId.get()}
                                                                     optionValues={organizations.get()}
                                                                     changeHandler={inputChangeHandler} /> : null}
            <SingleInput labelText={"Beosztás"} name={"innerRole"} changeHandler={inputChangeHandler} />

            <SelectFromArray labelText={"Jogosultsági kör"}
                             name={"role"}
                             value={admin.currentlyEdited.user.role.get()}
                             optionValues={roles}
                             changeHandler={inputChangeHandler} />

            <Button className={classes.submitButton}
                    type={"submit"}
                    variant={"outlined"}
                    color={"secondary"}>
                Feltöltés
            </Button>
        </AddFrame>
    </DialogFrame>
};

export default AddUser;
