import React, {useEffect} from 'react';
import classes from './addVideo.module.scss'
import PopupDialog from "../../universal/popupDialog/PopupDialog";
import {AdminAddHeader} from "../../universal/adminAddHeader/AdminAddHeader";
import SingleInput from "../../universal/singleInput/SingleInput";
import SelectFromArray from "../../universal/selectFromArray/SelectFromArray";
import instance from "../../../../services/axiosInstance";
import {useState} from "@hookstate/core";
import adminSideState from '../../../../store/admin/adminSideState';

const AddVideo = () => {
    const admin = useState(adminSideState)

    useEffect(() => {
        //TODO: Kurzusok fetchelése organizationId alapján
        //TODO: Array of objects készítése optionText és optionValue párokkal
    }, [])


    const [file] = React.useState<string | Blob>("")

    const submitHandler = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        e.preventDefault();
        let formdata: FormData =  new FormData(e.currentTarget)
        formdata.append('file', file)
        formdata.append('organizationId', localStorage.getItem("organizationId") || "")


        instance.post("videos/uploadvideo", formdata).then((res) => {
            if (res.status === 200) {
                console.log("dos")
            } else {
                console.log("fasd")
            }

        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <div className={classes.addUserOuterWrapper}>
            <PopupDialog exitButtonLink={""} />
            <AdminAddHeader />
            <form className={classes.addUserInnerWrapper} onSubmit={submitHandler}>
                <div className={classes.inputFields}>
                    <SingleInput labelText={"Főcím"} name={"title"} />
                    <SingleInput labelText={"Alcím"} name={"subTitle"} />
                    <SingleInput labelText={"URL cím"} name={"url"} />
                    <SingleInput labelText={"Leírás"} name={"description"} />
                    <SingleInput labelText={"Kurzus"} name={"courseId"} />
                    <SelectFromArray labelText={"Jogosultsági kör"}
                                     name={"role"}
                                     value={admin.currentlyEdited.video.permissionLevel.get()}
                                     optionValues={[{
                                         optionText: "Kérem válasszon...",
                                         optionValue: ""
                                     },{
                                         optionText: "Publikus",
                                         optionValue: "f"
                                     },{
                                         optionText: "Cégen belül publikus", //Automatikus orgId hozzárendelés
                                         optionValue: "s"
                                     },{
                                         optionText: "Csoporthoz kötött", //Csoport kiválasztása
                                         optionValue: "z"
                                     }]}/>
                    <SingleInput labelText={"Csoport"} name={"groupId"} />



                    <div className={classes.dataRow}>
                        <button type={"submit"}>Feltöltés</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddVideo;
