import { Connection } from '../../../services/connectMongo'
import {responseReducer} from '../../../services/responseReducer'
import {Request, Response, NextFunction} from "express";
import { ObjectID } from 'mongodb';


export const updateTag = (req: Request, res: Response, next: NextFunction) => {
    const insertData = async () => {
        if (req.body.name && req.body.name != "" && req.body._id && req.body._id != "") {
            console.log("VanNameVanId")
            const tagByName = await Connection.db.collection("tags").findOne({"name": req.body.name as string}).catch(e => {throw new Error("TagByName nem sikerült")})
            const tag = await Connection.db.collection("tags").findOne({_id: new ObjectID(req.body._id)}).catch(e => {throw new Error("Tag nem található")})
            console.log("VanNameVanId2" + tag + JSON.stringify(tagByName))

            if (tag && tagByName) {
                console.log("Jó_idJótagName")
                throw new Error("A tag már létezik")
            } else if (tag && !tagByName) {
                console.log("Jó_idNincsTagNameAzAdatbazisban")
                await Connection.db.collection("tags").findOneAndUpdate({"_id": new ObjectID(req.body._id)}, {
                    $set: {
                        name: req.body.name
                    }
                })
                return responseReducer(200, "Tag frissítve")
            } else if (!tag && !tagByName) {
                console.log("RosszIdNincsTagNameAzAdatbazisban")
                return Connection.db.collection("tags").insertOne({
                    name: req.body.name
                }).then((r) => {
                    if (req.body.courseId && req.body.courseId != "") {
                        Connection.db.collection("courses").findOneAndUpdate({_id: new ObjectID(req.body.courseId)}, {
                            $push: {
                                tags: req.body._id || r.insertedId.toString()
                            }
                        })
                    }
                    return responseReducer(201, {_id: r.insertedId.toString()})
                }).catch((e) => {
                    throw new Error("A tag hozzáadása az adatbázishoz sikertelen")
                })
            } else {
                console.log("Van ilyen tag")
                throw new Error("Már van ilyen tag")
            }
        } else if (req.body.name && req.body.name != "") {
            console.log("NincsIdNincsTagNameAzAdatbazisban")
            const tagByName = await Connection.db.collection("tags").findOne({"name": (new RegExp(req.body.name as string, 'i'))}).catch(e => {throw new Error("TagByName nem sikerült")})
            if (!tagByName) {
                return Connection.db.collection("tags").insertOne({
                    name: req.body.name
                }).then((r) => {
                    if (req.body.courseId && req.body.courseId != "") {
                        Connection.db.collection("courses").findOneAndUpdate({_id: new ObjectID(req.body.courseId)}, {
                            $push: {
                                tags: req.body._id || r.insertedId.toString()
                            }
                        })
                    }
                    return responseReducer(201, {_id: r.insertedId.toString()})
                }).catch((e) => {
                    throw new Error("A tag hozzáadása az adatbázishoz sikertelen")
                })
            } else {
                throw new Error("Már van ilyen tag")
            }

        } else {
            console.log("NincsIdNincsTagName")
            throw new Error("Hibás kérés")
        }
    }
    insertData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch((e) => {
        res.status(400).send(JSON.stringify(e))
    });
};
