import {Router} from "express";
export const router = Router()

import {getAllCourses} from './controllers/getAllCourses'
import {getCourse} from './controllers/getCourse'
import {createCourse} from './controllers/createCourse'
import {deleteCourse} from "./controllers/deleteCourse";
import {addToCourse} from "./controllers/addToCourse";
import {removeFromCourse} from "./controllers/removeFromCourse";
import {editCourse} from "./controllers/editCourse";
import {uploadCourseImage} from "./controllers/uploadCourseImage";


//get
router.get('/', getAllCourses);

router.get('/course/:courseId', getCourse);
router.put('/course/:courseId', addToCourse);
router.patch('/course/:courseId', editCourse);
router.patch('/course/:courseId/remove', removeFromCourse);
router.put('/course/:courseId/image', uploadCourseImage)
router.delete('/course/:courseId', deleteCourse)


router.post('/createCourse', createCourse)
