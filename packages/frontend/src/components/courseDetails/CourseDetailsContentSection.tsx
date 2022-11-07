import { CourseDetailsDTO } from '../../shared/dtos/CourseDetailsDTO';
import { roundNumber } from '../../static/frontendHelpers';
import { Playlist } from '../courseItemList/Playlist';

export const CourseDetailsContentSection = (props: { courseDetails: CourseDetailsDTO }) => {

    const { courseDetails } = props;

    const formatSeconds = (seconds: number) => {

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = roundNumber(seconds - (minutes * 60));

        return `${minutes}m ${remainingSeconds}s`;
    };

    return <Playlist modules={courseDetails.modules} />;
};
