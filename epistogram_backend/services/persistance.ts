import { ObjectID } from "mongodb"
import { IdType } from "../models/shared_models/types/sharedTypes"
import { Connection } from "./connectMongo"

export type CollectionNameType = "users";

export const useCollection = async <TItem>(collectionName: CollectionNameType) => {

    const collection = await Connection.db.collection(collectionName);

    const insertItem = (item: TItem) => {

        return collection.insertOne(item);
    }

    const getItemById = (id: IdType) => {

        return collection.findOne({ _id: new ObjectID(id) })
    }

    const getItems = () => {


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
        updateAsync
    }
}