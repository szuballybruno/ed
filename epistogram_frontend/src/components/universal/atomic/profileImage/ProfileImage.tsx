import React, {useRef} from 'react';
import classes from "./profileImage.module.scss"
import {config} from "../../../../configuration/config";
import {Cookies} from "react-cookie";

const ProfileImage = (props: {
    showSelectButton?: boolean,
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
    imageUrl?: string
}) => {
    const cookies = new Cookies()
    //const [file, setFile] = React.useState()
    const hiddenFileInput: React.MutableRefObject<any> = useRef();
    const handleUpload = () => {
        hiddenFileInput.current.click();
    }
    return (
        <div className={classes.profileImageWrapper}>
            {props.showSelectButton ? <div className={classes.addProfileImage} onClick={handleUpload}>
                Kiválasztás
            </div> : null}
            <input type="file"
                   ref={hiddenFileInput}
                   style={{display: "none"}}
                   onChange={props.onChange}/>
            <img alt=""
                 onError={(e) => {e.currentTarget.src = `${config.assetStorageUrl}/application/avatar.jpg`}}
                 src={props.imageUrl ? props.imageUrl : `${config.assetStorageUrl}/users/${cookies.get("userId")}/avatar.png`}/>
        </div>
    );
};

export default ProfileImage;
