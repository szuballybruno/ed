import { Request } from "express";
import { AdminPageEditCourseDTO } from "../models/shared_models/AdminPageEditCourseDTO";
import { SaveQuestionAnswerDTO } from "../models/shared_models/SaveQuestionAnswerDTO";
import { getAdminPageUsersList } from "../services/adminService";
import { getUserIdFromRequest } from "../services/authentication";
import { getEditedCourseAsync, getEditedVideoAsync, updateCourseAsync } from "../services/courseManagementService";
import { getCourseItemsAsync, getCurrentCourseItemDescriptorCodeAsync } from "../services/courseService";
import { getOrganizationsAsync, getOverviewPageDTOAsync } from "../services/dataService";
import { getSignupDataAsync, answerSignupQuestionAsync } from "../services/signupService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const getCurrentCourseItemCode = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const code = await getCurrentCourseItemDescriptorCodeAsync(userId);

    return code;
});

export const getCourseItemsAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getCourseItemsAsync(userId);
});

export const getEditedVideoAction = async (req: Request) => {

    const videoId = req.body.videoId

    return await getEditedVideoAsync(videoId);
};

export const getEditedCourseAction = async (req: Request) => {

    const courseId = req.body.courseId

    return await getEditedCourseAsync(courseId);
};

export const setEditedCourseAction = (req: Request) => {

    const adminPageEditCourseDTO = withValueOrBadRequest(req.body) as AdminPageEditCourseDTO;

    return updateCourseAsync(adminPageEditCourseDTO);
};

export const getOverviewPageDTOAction = async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getOverviewPageDTOAsync(userId);
}

export const getUsersAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const adminPageUserDTOs = await getAdminPageUsersList(userId, (req.query.searchData as string) ?? "");

    return adminPageUserDTOs;
});

export const getOrganizationsAction = (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getOrganizationsAsync(userId);
}

export const getSignupDataAction = getAsyncActionHandler((req: Request) => {

    const token = withValueOrBadRequest(req.body.token);

    return getSignupDataAsync(token);
});

export const answerSignupQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const dto = withValueOrBadRequest(req.body) as SaveQuestionAnswerDTO;
    const token = withValueOrBadRequest(dto.invitationToken);
    const questionAnswer = withValueOrBadRequest(dto.questionAnswer);

    await answerSignupQuestionAsync(token, questionAnswer);
});

// export const uploadCourseImage = (req: Request, res: Response, next: NextFunction) => {
//     let uploadedFile: UploadedFile
//     const updateData = async () => {
//         if (requestHasFiles(req)) {
//             uploadedFile = getSingleFileFromRequest(req);
//         }
//         createFile(uploadedFile, `/var/lib/assets/epistogram@development/courses/`, req.params.courseId)
//         return responseReducer(201, "Adatok hozzáadva az adatbázishoz ")
//     }
//     updateData().then((r) => {
//         res.status(r.responseStatus).send(r.responseText)
//     }).catch((e) => {
//         res.status(400).send(e.responseText)
//     });
// };

// export const updateTag = (req: Request, res: Response, next: NextFunction) => {
//     const insertData = async () => {
//         if (req.body.name && req.body.name != "" && req.body._id && req.body._id != "") {
//             console.log("VanNameVanId")
//             const tagByName = await Connection.db.collection("tags").findOne({"name": req.body.name as string}).catch(e => {throw new Error("TagByName nem sikerült")})
//             const tag = await Connection.db.collection("tags").findOne({_id: new ObjectID(req.body._id)}).catch(e => {throw new Error("Tag nem található")})
//             console.log("VanNameVanId2" + tag + JSON.stringify(tagByName))

//             if (tag && tagByName) {
//                 console.log("Jó_idJótagName")
//                 throw new Error("A tag már létezik")
//             } else if (tag && !tagByName) {
//                 console.log("Jó_idNincsTagNameAzAdatbazisban")
//                 await Connection.db.collection("tags").findOneAndUpdate({"_id": new ObjectID(req.body._id)}, {
//                     $set: {
//                         name: req.body.name
//                     }
//                 })
//                 return responseReducer(200, "Tag frissítve")
//             } else if (!tag && !tagByName) {
//                 console.log("RosszIdNincsTagNameAzAdatbazisban")
//                 return Connection.db.collection("tags").insertOne({
//                     name: req.body.name
//                 }).then((r) => {
//                     if (req.body.courseId && req.body.courseId != "") {
//                         Connection.db.collection("courses").findOneAndUpdate({_id: new ObjectID(req.body.courseId)}, {
//                             $push: {
//                                 tags: req.body._id || r.insertedId.toString()
//                             }
//                         })
//                     }
//                     return responseReducer(201, {_id: r.insertedId.toString()})
//                 }).catch((e) => {
//                     throw new Error("A tag hozzáadása az adatbázishoz sikertelen")
//                 })
//             } else {
//                 console.log("Van ilyen tag")
//                 throw new Error("Már van ilyen tag")
//             }
//         } else if (req.body.name && req.body.name != "") {
//             console.log("NincsIdNincsTagNameAzAdatbazisban")
//             const tagByName = await Connection.db.collection("tags").findOne({"name": (new RegExp(req.body.name as string, 'i'))}).catch(e => {throw new Error("TagByName nem sikerült")})
//             if (!tagByName) {
//                 return Connection.db.collection("tags").insertOne({
//                     name: req.body.name
//                 }).then((r) => {
//                     if (req.body.courseId && req.body.courseId != "") {
//                         Connection.db.collection("courses").findOneAndUpdate({_id: new ObjectID(req.body.courseId)}, {
//                             $push: {
//                                 tags: req.body._id || r.insertedId.toString()
//                             }
//                         })
//                     }
//                     return responseReducer(201, {_id: r.insertedId.toString()})
//                 }).catch((e) => {
//                     throw new Error("A tag hozzáadása az adatbázishoz sikertelen")
//                 })
//             } else {
//                 throw new Error("Már van ilyen tag")
//             }

//         } else {
//             console.log("NincsIdNincsTagName")
//             throw new Error("Hibás kérés")
//         }
//     }
//     insertData().then((r) => {
//         res.status(r.responseStatus).send(r.responseText)
//     }).catch((e) => {
//         res.status(400).send(JSON.stringify(e))
//     });
// // };

// export const setTask = (req: Request, res: Response, next: NextFunction) => {

//     const taskData = ["userId", "taskToUserId", "taskName", "dueDate", "state"]
//     // checkRequest(req, res, next, taskData)
//     const setTaskInDatabase = async () => {
//         await Connection.db.collection("users").updateOne(
//             { "_id": new ObjectID(req.body.taskToUserId) },
//             {
//                 "$push":
//                 {
//                     "userData.tasks":
//                     {
//                         "addedDate": Date.now(),
//                         "name": req.body.taskName,
//                         "from": new ObjectID(req.body.userId),
//                         "due": Date.parse(req.body.dueDate),
//                         "state": req.body.state
//                     }
//                 }
//             }
//         )
//         return responseReducer(200, "")
//     }

//     setTaskInDatabase().then((r) => {
//         return res.status(r.responseStatus).send(r.responseText)
//     })
// }

// export const uploadVideoImage = (req: Request, res: Response, next: NextFunction) => {
//     let uploadedFile: UploadedFile
//     const updateData = async () => {
//         const isItVideo = await Connection.db.collection("videos").findOne({ "_id": new ObjectID(req.params.itemId) })
//         //const isItExam = await Connection.db.collection("exams").findOne({"_id": new ObjectID(req.params.itemId)})
//         if (requestHasFiles(req)) {
//             uploadedFile = getSingleFileFromRequest(req);
//         }
//         isItVideo ? createFile(uploadedFile, `/var/lib/assets/epistogram@development/videos/`, req.params.itemId) : createFile(uploadedFile, `/var/lib/assets/epistogram@development/exams/`, req.params.itemId)
//         isItVideo && await Connection.db.collection("videos").updateOne({ "_id": new ObjectID(req.params.itemId) }, {
//             $set: {
//                 videoThumbnailUrl: "https://dev.epistogram.com/assets/epistogram/videos/" + req.params.itemId + "." + getFileExtension(uploadedFile.name)
//             }
//         })
//         return responseReducer(201, "Adatok hozzáadva az adatbázishoz ")
//     }
//     updateData().then((r) => {
//         res.status(r.responseStatus).send(r.responseText)
//     }).catch((e) => {
//         res.status(400).send(e.responseText)
//     });
// };