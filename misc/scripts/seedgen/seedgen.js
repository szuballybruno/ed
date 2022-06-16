import { oldmodules } from './oldmodules.js';
import { oldexams } from './oldexams.js';
import fs from 'fs';
import { oldquestions } from './oldquestions.js';
import { oldanswers } from './oldanswers.js';
import { videodatas } from './videodatas.js';

// const vvs = Object.keys(videos)
//     // .filter((_, i) => i < 10)
//     .map(videoKey => {

//         const videoId = videoKey
//             .replace('video_', '');

//         const versionKey = 'video_version_' + videoId;
//         const videoDataKey = 'video_data_' + videoId;
//         const videoObj = videos[videoKey];
//         const moduleKey = videoObj.moduleId.replace('module_', 'module_version_');


//         return `
//         ${versionKey}: {
//             videoId: videos.${videoKey}.id,
//             moduleVersionId: moduleVersions.${moduleKey}.id,
//             videoDataId: videoDatas.${videoDataKey}.id,
//         },
//         `;
//     });

// const vvs = Object.keys(oldmodules)
//     .map(key => {

//         const id = key
//             .replace('module_', '');

//         const versionKey = 'module_version_' + id;
//         const dataKey = 'module_data_' + id;
//         const entityKey = 'module_' + id;

//         const obj = oldmodules[key];
//         const courseKey = obj.courseId.replace('course_', 'course_version_');

//         return `
//         ${versionKey}: {
//             courseVersionId: courseVersions.${courseKey}.id,
//             moduleDataId: moduleDatas.${dataKey}.id,
//             moduleId: modules.${entityKey}.id
//         },
//         `;
//     });

// const vvs = Object.keys(oldexams)
//     .map(key => {

//         const id = key
//             .replace('exam_', '');

//         const versionKey = 'exam_version_' + id;
//         const dataKey = 'exam_data_' + id;
//         const entityKey = 'exam_' + id;

//         const obj = oldexams[key];
//         const moduleKey = obj.moduleId
//             ? 'moduleVersions.' + obj.moduleId.replace('module_', 'module_version_') + '.id'
//             : 'null';

//         return `
//     ${versionKey}: {
//         moduleVersionId: ${moduleKey},
//         examDataId: examDatas.${dataKey}.id,
//         examId: exams.${entityKey}.id
//     },
//     `;
//     });

// const vvs = Object.keys(oldquestions)
//     .map(key => {

//         const id = key
//             .replace('question_', '');

//         const versionKey = 'question_version_' + id;
//         const dataKey = 'question_data_' + id;
//         const entityKey = 'question_' + id;

//         const obj = oldquestions[key];
//         const videoKey = obj.videoId
//             ? 'videoVersions.' + obj.videoId.replace('video_', 'video_version_') + '.id'
//             : 'null';
//         const examKey = obj.examId
//             ? (obj.examId + '').includes('signup_exam')
//                 ? 'examVersions.signup_exam.id'
//                 : 'examVersions.' + obj.examId.replace('exam_', 'exam_version_') + '.id'
//             : 'null';

//         return `
//     ${versionKey}: {
//         questionId: questions.${entityKey}.id,
//         questionDataId: questionDatas.${dataKey}.id,
//         examVersionId: ${examKey},
//         videoVersionId: ${videoKey},
//     },
//     `;
//     });


// const vvs = Object.keys(oldanswers)
//     .map(key => {

//         const id = key
//             .replace('answer_', '');

//         const versionKey = 'answer_version_' + id;
//         const dataKey = 'answer_data_' + id;
//         const entityKey = 'answer_' + id;

//         const obj = oldanswers[key];
//         const quesitonKey = obj.questionId.replace('question_', 'question_version_');

//         return `
//     ${versionKey}: {
//         answerId: answers.${entityKey}.id,
//         answerDataId: answerDatas.${dataKey}.id,
//         questionVersionId: questionVersions.${quesitonKey}.id,
//     },
//     `;
//     });

let datas = fs.readFileSync('./videodatas.js', 'utf-8')

Object
    .keys(videodatas)
    .forEach(key => {

        const ads = videodatas[key];
        const fvid = ads.videoFileId;

        datas = datas.replace(fvid, key);
    });

fs.writeFileSync('./out.js', datas, 'utf-8')