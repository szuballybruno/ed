import {AxiosError, AxiosResponse} from "axios";
const axios = require("axios");
import {Request, Response, NextFunction} from "express";
import {responseReducer} from './responseReducer'

export const fetchVimeoAPI = (req: Request, res: Response, next:NextFunction) => {
    // Break out the id param from our request's query string
    const videoUrl = req.body.videoUrl
    const videoIdVimeoA = videoUrl.split("/video/").pop()
    const videoIdVimeo = videoIdVimeoA.substr(0, 8)
    const fetchVideoData = async () => {

        const apiUrl = `https://vimeo.com/api/v2/video/${videoIdVimeo}.json`

        const { videoData = null, error = null } = await axios.get(apiUrl).then((response: AxiosResponse) => {
            return {
                videoData: response.data[0]
            }
        }).catch((error: AxiosError) => {
            return { error }
        })

        if (error !== null) {
            return responseReducer(400, "A videó adatainak begyűjtése sikertelen")
        }

        // if there's no video data the stop
        if (videoData === null) {
            return responseReducer(400, "A videó adatainak begyűjtése sikertelen")
        }

        // Ezt kell visszaadni id alapján
        return videoData

    }
    return fetchVideoData().then(r => {
        return r
    }).catch((e) => {
        return next({responseStatus: e.responseStatus, responseText: e.responseText})
    })

}