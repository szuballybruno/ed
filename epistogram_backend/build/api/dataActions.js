"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSignupQuestionnaireAnswersAction = exports.getSignupDataAction = exports.getOrganizationsAction = exports.getUsersAction = exports.getOverviewPageDTOAction = void 0;
const adminService_1 = require("../services/adminService");
const authentication_1 = require("../services/authentication");
const dataService_1 = require("../services/dataService");
const signupService_1 = require("../services/signupService");
const helpers_1 = require("../utilities/helpers");
const getOverviewPageDTOAction = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = authentication_1.getUserIdFromRequest(req);
    return dataService_1.getOverviewPageDTOAsync(userId);
});
exports.getOverviewPageDTOAction = getOverviewPageDTOAction;
exports.getUsersAction = helpers_1.getAsyncActionHandler((req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = authentication_1.getUserIdFromRequest(req);
    const adminPageUserDTOs = yield adminService_1.getAdminPageUsersList(userId, (_a = req.query.searchData) !== null && _a !== void 0 ? _a : "");
    return adminPageUserDTOs;
}));
const getOrganizationsAction = (req) => {
    const userId = authentication_1.getUserIdFromRequest(req);
    return dataService_1.getOrganizationsAsync(userId);
};
exports.getOrganizationsAction = getOrganizationsAction;
exports.getSignupDataAction = helpers_1.getAsyncActionHandler((req) => {
    const token = helpers_1.withValueOrBadRequest(req.body.token);
    return signupService_1.getSignupDataAsync(token);
});
exports.saveSignupQuestionnaireAnswersAction = helpers_1.getAsyncActionHandler((req) => {
    const dto = helpers_1.withValueOrBadRequest(req.body);
    const token = helpers_1.withValueOrBadRequest(dto.invitationToken);
    const answers = helpers_1.withValueOrBadRequest(dto.answers);
    return signupService_1.saveSignupQuestionnaireAnswersAsync(token, answers);
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
//# sourceMappingURL=dataActions.js.map