import { Flex } from '@chakra-ui/layout';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';

export const NoQuestionsAvailable = () => {
    
    const { navigate } = useNavigation();
    return <Flex pr="20px">

        <Flex direction={'column'}>

            <EpistoFont
                style={{
                    padding: '20px 20px 10px 10px',
                    fontSize: '13px'
                }}>
                {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosOne}
            </EpistoFont>

            <EpistoFont
                style={{
                    padding: '10px 20px 10px 10px',
                    fontSize: '13px'
                }}>

                {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosTwo}

                {/* VALIDATE DOM NESTING */}
                {/* <EpistoFont
                    onClick={() => navigate(applicationRoutes.availableCoursesRoute)}
                    style={{
                        color: 'var(--epistoTeal)',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosButton}
                </EpistoFont> */}
            </EpistoFont>
        </Flex>

        <Flex>
            <img
                src={Environment.getAssetUrl('/images/welcome3D.png')}
                alt=""
                style={{
                    objectFit: 'contain',
                }} />
        </Flex>
    </Flex>;
};