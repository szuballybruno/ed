import { forwardRef } from "react";

export type HiddenFileUploadInputPropsType = {
    onImageSelected: (src: string, file: File) => void
}

export const HiddenFileUploadInput = forwardRef<HTMLInputElement, HiddenFileUploadInputPropsType>((props, ref) => {

    const { onImageSelected } = props;

    return <input
        ref={ref}
        type="file"
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

            var reader = new FileReader();

            reader.onloadend = () => {

                const src = reader.result as any;

                onImageSelected(src, file);
            }

            reader.readAsDataURL(file);
        }} />
});