import { Box } from "@chakra-ui/react"
import { Button, ButtonProps } from "@mui/material"
import { ReactNode } from "react";
import { uploadAvatarFileAsync, uploadVideoFileAsync } from "../services/fileService";
import { httpPostAsync, postFileAsync } from "../services/httpClient";
import { showNotification, useDialog } from "../services/notifications";

const FileUploadButton = (props: {
    children: ReactNode,
    onSelected: (file: File) => void,
    accept?: string
}) => {

    const { accept } = props;

    return <Button
        variant="contained"
        component="label"
        onChange={x => {

            const input = x.target;
            const file = input.files[0] as File;
            props.onSelected(file);
            input.value = "";
        }}>
        {props.children}
        <input
            type="file"
            accept={accept}
            style={{ display: "none" }} />
    </Button>
}

export const FileUploadPage = () => {

    const { showDialog } = useDialog();

    return <Box>
        <FileUploadButton onSelected={(file) => {

            uploadVideoFileAsync(1, file);
        }}>
            Upload video...
        </FileUploadButton>
        <FileUploadButton onSelected={(file) => {

            uploadAvatarFileAsync(file);
        }}>
            Upload avatar...
        </FileUploadButton>

        <Button onClick={() => {

            showNotification("asd");
        }}>Notif</Button>

        <Button onClick={() => {

            showDialog({
                title: "asd",
                description: "desc",
                firstButtonTitle: "first b",
                secondButtonTitle: "sec b"
            })
        }}>Dialog</Button>
    </Box>
}