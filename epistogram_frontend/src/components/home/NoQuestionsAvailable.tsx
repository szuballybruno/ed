import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { useIsMobileView } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';

export const NoQuestionsAvailable = () => {

    const { navigate2 } = useNavigation();
    const isMobile = useIsMobileView();

    return <EpistoFlex2>

        <EpistoFlex2
            align={isMobile ? 'center' : undefined}
            justify={isMobile ? 'space-between' : undefined}
            padding='20px 20px 10px 10px'
            direction={'column'}>

            <EpistoFont
                style={{
                    fontSize: '13px',
                    paddingRight: '20px'
                }}>
                {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosOne}
            </EpistoFont>

            {isMobile
                ? <>
                    <EpistoFont
                        style={{
                            fontSize: '13px',
                            display: 'inline-block'
                        }}>

                        {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosTwo}
                    </EpistoFont>

                    <EpistoButton variant='light'>

                        {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosButton}
                    </EpistoButton>
                </>
                : <EpistoFont
                    style={{
                        padding: '10px 20px 10px 10px',
                        fontSize: '13px',
                        display: 'inline-block'
                    }}>

                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosTwo}

                    {/* TODO Currently not working with EpistoFont: needs <a> tag */}
                    <a
                        onClick={() => navigate2(applicationRoutes.availableCoursesRoute)}
                        style={{
                            color: 'var(--epistoTeal)',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>

                        {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosButton}
                    </a>
                </EpistoFont>}
        </EpistoFlex2>

        {!isMobile && <EpistoFlex2>
            <img
                src={Environment.getAssetUrl('/images/welcome3D.png')}
                alt=""
                style={{
                    objectFit: 'contain',
                }} />
        </EpistoFlex2>}
    </EpistoFlex2>;
};
