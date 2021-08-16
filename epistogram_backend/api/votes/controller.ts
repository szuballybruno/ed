import { Connection } from '../../services/connectMongo'
import { responseReducer } from '../../services/responseReducer'
import { ObjectId } from 'mongodb'
// import { checkRequest } from '../../services/checkRequest'
import { Request, Response, NextFunction } from "express";

export const getVote = (req: Request, res: Response, next: NextFunction) => {
    // checkRequest(req, res, next, ["_id"])
    const aszink = async () => {
        const vote = await Connection.db.collection("votes").findOne({ "active": true });
        const user = await Connection.db.collection("users").findOne({
            $and: [
                { "_id": new ObjectId(req.query._id as string) },
                { "voteStats.voteId": vote._id }]
        })
        if (!vote) {
            responseReducer(400, "Jelenleg nem érhető el egyetlen szavazás sem")
        } else if (user === null) {
            responseReducer(200, {
                "responseText": "Még nem szavaztál",
                "_id": vote._id,
                "voteQuestion": vote.voteQuestion,
                "voteFirstAnswerName": vote.voteFirstAnswerName,
                "voteFirstAnswerPath": vote.voteFirstAnswerPath,
                "voteSecondAnswerName": vote.voteSecondAnswerName,
                "voteSecondAnswerPath": vote.voteSecondAnswerPath
            })
        } else {
            responseReducer(200, {
                "responseText": "Már szavaztál",
                "voteAnswersCount": vote.voteAnswersCount,
                "voteFirstAnswerName": vote.voteFirstAnswerName,
                "voteFirstAnswerCount": vote.voteFirstAnswerCount,
                "voteSecondAnswerName": vote.voteSecondAnswerName,
                "voteSecondAnswerCount": vote.voteSecondAnswerCount
            })
        }
    }
    aszink().then(r => {

    }).catch(e => {

    })
};

export const getVotes = (req: Request, res: Response) => {
    const fetchData = async () => {
        const allVotes = await Connection.db.collection("votes").find({}).toArray()
        return responseReducer(200, allVotes)
    }
    fetchData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch((e) => {
        res.status(e.responseStatus).send(e.responseText)
    })

};

export const uploadVote = (req: Request, res: Response, next: NextFunction) => {
    /*verifyFile(req,res,next)
    const aszink = async () => {
        const path = `${config.uploadFolderPath}/votes/${req.body.voteName}`;

        req.files.files.map((file,index) => {
            const name = file.name
            const fileExtension = (name.substr(name.lastIndexOf('.') + 1));
            if (index === 0) {
                createFile(file, path, "voteFirstAnswerCount" + "." + fileExtension)
            } else if (index === 1) {
                createFile(file, path, "voteSecondAnswerCount" + "." + fileExtension)
            } else {
                console.log("Több képet próbáltál feltölteni 2-nél")
            }
        })
        const imagePaths = await searchImages(path)

        Votes.updateMany({"active": true}, {$set : {"active": false} }, {multi: true}, (err) => {});
        const createdVote = await new Votes({
            voteName: req.body.voteName,
            voteQuestion: req.body.voteQuestion,
            voteAnswersCount: 0,
            voteFirstAnswerName: req.body.voteFirstAnswerName,
            voteFirstAnswerCount: 0,
            voteFirstAnswerPath: `${config.backendUrlMinimal}/uploads/votes/${req.body.voteName}/${imagePaths[0]}`,
            voteSecondAnswerName: req.body.voteSecondAnswerName,
            voteSecondAnswerCount: 0,
            voteSecondAnswerPath: `${config.backendUrlMinimal}/uploads/votes/${req.body.voteName}/${imagePaths[1]}`,
            active: true,
        });

        await createdVote.save(error => {
            if (error === "undefined" || error != null) {
                return error
            } else {
                return "siker"
            }
        });
    }
    aszink(req,res,next).then(() => {
        res.status(200).send("Siker")
    }).catch((error) => {
        res.status(404).send("Sikernt" + error)
    })*/

};

export const updateVote = (req: Request, res: Response, next: NextFunction) => {
    /*const aszink = async () => {
        const vote = await Votes.findOne({"_id": req.query.voteId})
        const user = await User.findOne({"_id": req.query.userId}).elemMatch("userStats.doneVotes",{voteId: req.query.voteId})
        if (vote === null || req.query.voteValue === undefined) {
            return responseReducer(400, "Sikertelen szavazás")
        } else if (user === null) {
            const user = await User.findOne({"_id": req.query.userId})
            user.userStats.doneVotes.push({
                voteId: req.query.voteId,
                voteValue: req.query.voteValue
            })
            user.save()
            vote[req.query.voteValue]++
            vote.voteAnswersCount++
            vote.save()
            return responseReducer(200, "Sikeres szavazás")
        } else {
            return responseReducer(200, "Már szavaztál")
        }
    }
    aszink().then(r => {
        res.status(r.responseStatus).send(r.responseText)
    })*/
};

