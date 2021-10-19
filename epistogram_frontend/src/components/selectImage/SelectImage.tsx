import { Add, EditOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React, { useRef } from 'react';
import classes from "./selectImage.module.scss";

const SelectImage = (props: {
    onChange: (e: any) => any,
    uploadedImageUrls: string[],
    title: string
}) => {
    const hiddenFileInput: React.MutableRefObject<any> = useRef();

    const handleUpload = () => {
        hiddenFileInput.current.click();
    }
    return <div className={classes.selectImageWrapper}>
        <div className={classes.titleWrapper}>
            <Typography variant={"overline"}>{props.title}</Typography>
        </div>
        {props.uploadedImageUrls.map((image) => {
            return image ? <div className={classes.selectedImageWrapper}>
                <img className={classes.selectedImage}
                    src={image}
                    alt={""} />
                <Button className={classes.selectImagePlaceholder}>
                    <EditOutlined onClick={handleUpload} />
                </Button>
            </div> : <Button onClick={handleUpload} className={classes.selectedImagePlaceholder}>
                <Add />
            </Button>
        })}

        <input type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={props.onChange} />
    </div>
};

export default SelectImage;
