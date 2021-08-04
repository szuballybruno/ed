const responseReducer = require('../../../../services/responseReducer')
const { Connection } = require('../../../../services/connectMongo')
const ObjectID = require('mongodb').ObjectID

const getUser = (req, res, next) => {
    const fetchData = async () => {
        const user = await Connection.db.collection("users").findOne({_id: ObjectID(req.query.userId)})

        const currentCourse = await Connection.db.collection("courses").findOne({_id: ObjectID(user.userData.currentCourseId)})

        const currentVideo = await  Connection.db.collection("videos").findOne({_id: ObjectID(user.userData.currentVideoId)})

        let count = await Connection.db.collection("videos").find().count()
        let random = Math.floor(Math.random() * count);
        let currentSeeSomethingNew = await Connection.db.collection("videos").find().limit(-1).skip(random).next()



        const fetchCourses = () => {
            const promisedCourses = user.userStatistics.courses.map(async (course) => {
                return await Connection.db.collection("courses").findOne({_id: ObjectID(course.courseId)})
            });
            return Promise.all(promisedCourses);
        }

        const doneCourses = await fetchCourses()

        const fetchExams = () => {
            const promisedCourses = user.userStatistics.exams.map(async (exam) => {
                return await Connection.db.collection("exams").findOne({_id: ObjectID(exam.examId)})
            });
            return Promise.all(promisedCourses);
        }

        const doneExams = await fetchExams()

        const fetchUserTags = () => {
            const promisedCourses = user.userStatistics.tags.map(async (tag) => {
                return await Connection.db.collection("tags").findOne({_id: ObjectID(tag.tagId)})
            });
            return Promise.all(promisedCourses)
        }
        const userTags = await fetchUserTags()
        console.log(userTags)

        const fetchFavoriteCourses = () => {
            const promisedCourses = userTags.map(async (tag) => {
                return await Connection.db.collection("courses").findOne({tags: ObjectID(tag._id)})
            });
            return Promise.all(promisedCourses);
        }

        const favoriteCourses = await fetchFavoriteCourses()

        const fetchRecommendedCourses = () => {
            const promisedCourses = userTags.map(async (tag) => {
                return await Connection.db.collection("courses").findOne({tags: ObjectID(tag.tagId)})
            });
            return Promise.all(promisedCourses);
        }

        const recommendedCourses = await fetchRecommendedCourses()

        let data = {
            userData: {
                allowedMachinesAtHome: user.userData.security.allowedMachines,
                avatarUrl: user.userData.avatarUrl,
                badges: user.userData.badges,
                currentCourse: currentCourse,
                currentSeeSomethingNew: currentSeeSomethingNew,
                currentVideo: currentVideo, //Ennek már teljes egészében betölthetőnek kell lennie
                doneCourses: doneCourses,  //Object, ami tartalmazza a kurzus szükséges! adatait
                doneExams: doneExams,
                email: user.userData.email,
                epistoCoins: user.userData.epistoCoins,
                firstName: user.userData.firstName,
                favoriteCourses: favoriteCourses, //Object, ami tartalmazza a kurzus szükséges! adatait //Most url később object
                innerRole: user.userData.innerRole,
                lastName: user.userData.lastName,
                linkedInUrl: user.userData.linkedInUrl,
                phoneNumber: user.userData.phoneNumber,
                recommendedCourses: recommendedCourses,
                role: user.userData.role,
                username: user.userData.role,
                userDescription: user.userData.role
            },
            userStatistics: {

            },
            course: currentCourse,
            video: currentVideo,
            // A jelenlegi szavazás adatai
            vote: {
                responseText: "",
                _id: "",
                voteQuestion: "",
                voteFirstAnswerName: "",
                voteFirstAnswerPath: "",
                voteSecondAnswerName: "",
                voteSecondAnswerPath: "",
                voteAnswersCount: 0,
                voteFirstAnswerCount: 0,
                voteSecondAnswerCount: 0
            }
        }
        return responseReducer(200, data)
    }

    fetchData().then((r) => {
        res.status(r.responseStatus).json(r.responseText)
    }).catch((e) => {
        res.status(400).send(e.errorText)
    })

};

module.exports = getUser