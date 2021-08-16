import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { IdType } from "../../../../models/shared_models/types/sharedTypes";
import { globalConfig } from "../../../../server";
import { getUserIdFromRequest } from "../../../../services/authentication";
// import { checkRequest } from "../../../../services/checkRequest";
import { Connection } from '../../../../services/connectMongo';
import { responseReducer } from "../../../../services/responseReducer";

type activity = {
    // MINDEGYIKHEZ KELL
    //createdAt: Date, // A jelenlegi dátum automatikusan hozzáfűzve
    actionType: string //"playVideo" | "pauseVideo" | "openNewVideo" | "openNewCourse" // A konkrét cselekvés típusa például videó megtekintése, szavazás megtekintése
    actionTriggererURL: string // A cselekvés származási URL-je
    actionTriggererItemName: string // A cselekvést kiváltó elem egyedi elnevezése camelCasing-el
    actionTriggererItemLabel: string // A cselekvést kiváltó elem felhasználó által látható elnevezése
    activityType: "modification" | "generalPassive" | "collBasedPassive" | "collBasedActive", // Összesen négy értéke lehet, az aktivitás típusát határozza meg.
    description: string // A cselekvés leírása saját szavakkal
    sentByUser: boolean // A felhasználó vagy a szoftver küldte a kérést

    // BIZONYOS ESETEKBEN BÁRMELYIKHEZ KELLHET

    actionSubject?: string, // Az action tárgya, amihez kötődik
    actionValue?: string, //
    collectionName?: string, // Bármelyik létező collection neve lehet.
    groupByPropertyName?: string, // Az adott collectionben létező érték neve, például _id, name, category stb.
    groupByPropertyValue?: string, // A groupByPropertyName-hez tartozó aktuális érték, például _id esetén: 6022c270f66f803c80243250
    actionTriggererItemKey?: string // A cselekvést kiváltó elem egyedi azonosítója generált elemek esetén
    nextStateURL?: string // A következő oldal URL-je, ha van.
    nextStateType?: string // oldalmódosítás, ui módosítás,
    nextStateValue?: string

    // CSAK MÓDOSÍTÁS ESETÉN KELL

    modifiedPropertyName?: string,
    modifiedPropertyCurrentValue?: string,
    modifiedPropertyNextValue?: string,
}

const updateActivity = async (activity: activity, userId: IdType) => {

    try {
        await Connection.db.collection("users").updateOne({ "_id": new ObjectID(userId) }, {
            $push: {
                activities: {
                    createdAt: Date.now(),
                    activity
                }
            }
        })
    } catch (e) {
        throw new Error("Shit heppönsz" + e.toString()) // "XD" by Bence
    }

    return responseReducer(200, "Adatfrissítés sikeres")
}

export const updateActivityAction = (req: Request, res: Response, next: NextFunction) => {

    const userId = getUserIdFromRequest(req);
    const activity = req.body as activity;

    updateActivity(activity, userId)
        .then((r) => {
            res.status(r.responseStatus).send(r.responseText)
        })
        .catch((e) => {
            res.status(400).send(e.toString())
        });
};
