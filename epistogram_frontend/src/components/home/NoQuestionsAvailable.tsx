import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { useIsMobileView } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
export const NoQuestionsAvailable = () => {

    const { navigate2 } = useNavigation();
    const isMobile = useIsMobileView();

    return <EpistoFlex2
        flex='1'
        align='flex-start'
        minWidth='400px'>

        <EpistoFlex2
            flex={1}
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

            <>
                <EpistoFont
                    style={{
                        fontSize: '13px',
                        marginTop: '10px',
                        display: 'inline-block'
                    }}>

                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosTwo}
                </EpistoFont>

                <EpistoButton
                    variant='light'
                    style={{
                        margin: !isMobile ? '10px 0 0 0' : undefined,
                        maxWidth: '300px'
                    }}>

                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosButton}
                </EpistoButton>
            </>
        </EpistoFlex2>

        {!isMobile && <EpistoFlex2
            flex='1'
            maxWidth='250px'
            height='100%'
            align='center'>

            <img
                src={Environment.getAssetUrl('/images/welcome3D.png')}
                alt=""
                style={{
                    objectFit: 'contain',
                }} />
        </EpistoFlex2>}
    </EpistoFlex2>;
};
