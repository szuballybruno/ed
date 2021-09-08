import React from 'react';
import { getAssetUrl } from '../../../../frontendHelpers';
import classes from "./profileImage.module.scss";

const ProfileImage = (props: { imageUrl?: string }) => {

    // const cookies = new Cookies()
    // //const [file, setFile] = React.useState()
    // const hiddenFileInput: React.MutableRefObject<any> = useRef();
    // const handleUpload = () => {
    //     hiddenFileInput.current.click();
    // }

    const defaultImage = getAssetUrl("/images/defaultAvatar.png");

    return (
        <div className={classes.profileImageWrapper}>
            {/* {props.showSelectButton ? <div className={classes.addProfileImage} onClick={handleUpload}>
                Kiválasztás
            </div> : null}
            <input type="file"
                   ref={hiddenFileInput}
                   style={{display: "none"}}
                   onChange={props.onChange}/> */}

            <img
                alt=""
                onError={(e) => e.currentTarget.src = defaultImage}
                src={props.imageUrl ?? defaultImage} />
        </div>
    );
};

export default ProfileImage;
