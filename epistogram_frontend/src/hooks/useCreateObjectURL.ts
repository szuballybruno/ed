//Creates an objectURL from the selected image
import {useEffect} from "react";

export const useCreateObjectURL = (imageUrl: any, setImageUrl: (imageUrl: string) => void) => useEffect(() => {

    console.log("useCreateObjectURL hook called")
    !!imageUrl && setImageUrl(URL.createObjectURL(imageUrl[0]))

}, [imageUrl, setImageUrl])