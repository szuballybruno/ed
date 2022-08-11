import { Flex } from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { CurrentUserContext } from '../system/AuthenticationFrame';

export const Greetings = () => {

    const { navigate } = useNavigation();
    const { firstName } = useContext(CurrentUserContext);

    return <Flex
        direction="row"
        alignItems="center">

        <Flex
            direction="column"
            justifyContent="flex-start"
            height="100%">

            <EpistoFont
                fontSize2="small"
                style={{
                    padding: '20px 20px 10px 10px'
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsFirst + ' ' + firstName + ','}
            </EpistoFont>

            <EpistoFont
                fontSize2="small"
                style={{
                    padding: '20px 20px 10px 10px'
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsSecond}
            </EpistoFont>

            <EpistoFont
                fontSize2="small"
                style={{
                    padding: '20px 20px 10px 10px'
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsThird}
            </EpistoFont>

            <Flex
                direction="column"
                width="100%"
                alignItems="center"
                mt="10px">

                <EpistoButton
                    variant={'colored'}
                    onClick={() => {
                        navigate(applicationRoutes.availableCoursesRoute);
                    }}>

                    {translatableTexts.practiseQuestions.goToCourses}
                </EpistoButton>
            </Flex>
        </Flex>

        <Flex>
            <Player
                autoplay
                loop
                src={Environment.getAssetUrl('lottie_json/initial_greetings.json')}
                style={{ height: '300px', width: '300px' }}
            />
        </Flex>
    </Flex>;
};