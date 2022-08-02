import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';

export const ContinueCourseButton = ({
    currentCourseItemCode,
}: {
    currentCourseItemCode: string | null,
}) => {

    const { navigateToPlayer, navigate } = useNavigation();
    const continueCourse = () => navigateToPlayer(currentCourseItemCode!);

    console.log(currentCourseItemCode);

    if (!currentCourseItemCode)
        return <></>;

    return <>
        {currentCourseItemCode && (

            <EpistoButton
                className="mildShadow"
                style={{
                    color: '--epistoTeal',
                    background:
                        'var(--transparentWhite70)',
                    border: 'none',
                }}
                variant="outlined"
                onClick={() => continueCourse()}
                icon={
                    <img
                        alt=""
                        src={Environment.getAssetUrl(
                            '/icons/play2.svg'
                        )}
                        style={{
                            width: '25px',
                            height: '25px',
                        }}
                    />}>

                <EpistoFont
                    style={{
                        margin: '0 0 0 5px'
                    }}
                    isUppercase>

                    {translatableTexts.navbar.currentCourse}
                </EpistoFont>
            </EpistoButton>
        )}
    </>;
};