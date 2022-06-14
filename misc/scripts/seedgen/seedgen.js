import { videos } from './file.js';
import fs from 'fs';

const vvs = Object.keys(videos)
    // .filter((_, i) => i < 10)
    .map(videoKey => {

        const videoId = videoKey
            .replace('video_', '');

        const versionKey = 'video_version_' + videoId;
        const videoDataKey = 'video_data_' + videoId;
        const videoObj = videos[videoKey];
        const moduleKey = videoObj.moduleId.replace('module_', 'module_version_');


        return `
        ${versionKey}: {
            videoId: videos.${videoKey}.id,
            moduleVersionId: moduleVersions.${moduleKey}.id,
            videoDataId: videoDatas.${videoDataKey}.id,
        },
        `;
    });

fs.writeFileSync('./out.js', vvs.join(''), 'utf-8')