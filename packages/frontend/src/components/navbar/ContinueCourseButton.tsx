import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { useCurrentCourseItemCodeContext } from '../system/CurrentCourseItemFrame';

export const ContinueCourseButton = () => {

    const { continueCourse } = useNavigation();

    const { currentCourseData } = useCurrentCourseItemCodeContext();

    return <>
        {currentCourseData && (

            <EpistoButton
                className="mildShadow"
                style={{
                    color: 'var(--eduptiveDeepDarkGreen)',
                    background:
                        'var(--eduptiveYellowGreen)',
                    border: 'none',
                    padding: '0 20px'
                }}
                variant="action"
                onClick={() => continueCourse(
                    currentCourseData.courseId,
                    currentCourseData.stageName,
                    currentCourseData.currentItemCode as any)}
                icon={
                    <img
                        alt=""
                        src={Environment.getAssetUrl(
                            '/icons/play2.svg'
                        )}
                        style={{
                            width: '25px',
                            height: '25px',
                            margin: '0 10px 0 0'
                        }}
                    />}>


                {translatableTexts.navbar.currentCourse}
            </EpistoButton>
        )}
    </>;
};