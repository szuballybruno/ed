import { forwardRef } from "react";

export type HiddenFileUploadInputPropsType = {
    type: "image" | "video",
    onFileSelected: (file: File, src: string) => void
}

export const HiddenFileUploadInput = forwardRef<HTMLInputElement, HiddenFileUploadInputPropsType>((props, ref) => {

    const { onFileSelected, type } = props;
    const acceptImage = ".jpg, .png, .jpeg";
    const acceptVideo = ".mp4";

    return <input
        ref={ref}
        type="file"
        accept={type === "image" ? acceptImage : acceptVideo}
        id="imgupload"
        style={{ display: "none" }}
        onChange={x => {

            const input = x.currentTarget;
            if (!input)
                return;

            if (!input.files)
                return;

            const file = input.files[0] as File;
            input.value = "";

            // image
            if (type === "image") {
                var reader = new FileReader();

                reader.onloadend = () => {

                    const src = reader.result as any;

                    onFileSelected(file, src);
                }

                reader.readAsDataURL(file);
            }

            // video
            else {

                onFileSelected(file, "");
            }
        }} />
});