import { Box } from "@chakra-ui/react"
import { Button, ButtonProps } from "@material-ui/core"
import { ReactNode } from "react";
import { uploadVideoFileAsync } from "../services/fileService";
import { httpPostAsync, postFileAsync } from "../services/httpClient";

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

    return <Box>
        <FileUploadButton onSelected={(file) => {

            uploadVideoFileAsync(1, file);
        }}>
            Upload video...
        </FileUploadButton>
    </Box>
}