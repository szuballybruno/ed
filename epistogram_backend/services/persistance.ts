import { ObjectId, ObjectID } from "mongodb"
import { IdType } from "../models/shared_models/types/sharedTypes"
import { Connection } from "./connectMongo"
import { logError } from "./logger";

export type CollectionNameType = "users" | "videos" | "courses";

export const useCollection = async <TItem>(collectionName: CollectionNameType) => {

    const collection = await Connection.db.collection(collectionName);

    const insertItem = (item: TItem) => {

        return collection.insertOne(item);
    }

    const getItemById = (id: IdType) => {

        let objectId;

        try {
            objectId = new ObjectID(id);
        }
        catch (e) {

            return null;
        }

        return collection.findOne({ _id: objectId })
    }

    const getItems = () => {


    }

    const aggregateAsync = async <T>(pipeline: object[]) => {

        try {

            const array = await collection.aggregate(pipeline).toArray();
            return array as T[];
        } catch (e) {

            logError(e);
            throw new Error("Database aggregation error." + e.message);
        }
    }

    const updateAsync = (id: string, updateCommandObject: object) => {
        return collection.findOneAndUpdate(
            {
                "_id": new ObjectID(id)
            },
            {
                $set: updateCommandObject
            },
            {
                upsert: false,
                new: true
            } as any);
    }

    const deleteItemById = (id: IdType) => {

    }

    return {
        collection,
        insertItem,
        getItemById,
        getItems,
        deleteItemById,
        updateAsync,
        aggregateAsync
    }
}