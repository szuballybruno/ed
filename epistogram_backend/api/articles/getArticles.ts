import express from "express";
import {Connection} from "../../services/connectMongo";
import {responseReducer} from "../../services/responseReducer"


export const getArticles = (req: express.Request, res: express.Response) => {
    const fetchData = async () => {
        const allArticles = await Connection.db.collection("articles").find( {} ).toArray();
        return responseReducer(200, allArticles)
    }
    fetchData().then((r) => {
        res.status(r.responseStatus).json(r.responseText)
    }).catch((e) => {
        res.status(400).send(e.errorText)
    })
};