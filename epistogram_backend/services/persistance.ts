import { ObjectID } from "mongodb"
import { IdType } from "../models/shared_models/types/sharedTypes"
import { Connection } from "./connectMongo"

export const useCollection = async <TItem>(collectionName: string) => {

    const collection = await Connection.db.collection(collectionName);

    const insertItem = (item: TItem) => {

        return collection.insertOne(item);
    }

    const getItemById = async (id: IdType) => {

        return collection.findOne({ _id: new ObjectID(id) })
    }

    const getItems = () => {


    }

    const deleteItemById = (id: IdType) => {

    }

    return {
        collection,
        insertItem,
        getItemById,
        getItems,
        deleteItemById
    }
}