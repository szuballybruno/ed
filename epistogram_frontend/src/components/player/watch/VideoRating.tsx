import { Flex } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRateVideoDifficulty, useRateVideoExperience, useVideoRating } from '../../../services/api/videoRatingApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { getAssetUrl, iterate } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { RatingStars } from '../../universal/RatingStars';

export const VideoRating = (props: { videoId: number }) => {

    const { videoId } = props;

    // http
    const { videoRating, refetchVideoRating } = useVideoRating(videoId);
    const { rateVideoExperienceAsync } = useRateVideoExperience();
    const { rateVideoDifficultyAsync } = useRateVideoDifficulty();

    // util
    const showError = useShowErrorDialog();

    // state 
    const [showDificultyRating, setShowDificultyRating] = useState(false);
    const [difficultyRating, setDifficultyRating] = useState<number | null>(null);
    const [experienceRating, setExperienceRating] = useState<number | null>(null);

    // func
    const handleRateVideoExperienceAsync = async (rating: number) => {

        try {

            await rateVideoExperienceAsync({ videoId, experience: rating });
            await refetchVideoRating();
            setShowDificultyRating(true);
        }
        catch (e) {

            showError(e);
        }
    };

    const handleRateVideoDifficultyAsync = async (rating: number) => {

        try {

            await rateVideoDifficultyAsync({ videoId, difficulty: rating });
            await refetchVideoRating();
            setShowDificultyRating(false);
        }
        catch (e) {

            showError(e);
        }
    };

    useEffect(() => {

        setShowDificultyRating(false);
    }, [videoId]);

    useEffect(() => {

        setDifficultyRating(videoRating?.difficulty ?? null);
        setExperienceRating(videoRating?.experience ?? null);
    }, [videoRating]);

    return (
        <Flex direction="column">

            {/* experience rating */}
            {!showDificultyRating && <Flex
                mx="10px"
                direction="column"
                align="flex-end">

                {/* title */}
                <EpistoFont
                    fontSize="fontExtraSmall"
                    isUppercase>

                    {translatableTexts.player.videoRating.experienceRating}
                </EpistoFont>

                {/* rating buttons  */}
                <RatingStars
                    setSelectedIndex={handleRateVideoExperienceAsync}
                    selectedIndex={experienceRating} />
            </Flex>}

            {/* difficulty rating */}
            {showDificultyRating && <Flex
                mx="10px"
                direction="column"
                align="flex-end">

                {/* title */}
                <EpistoFont
                    fontSize="fontExtraSmall"
                    isUppercase>

                    {translatableTexts.player.videoRating.difficultyRating}
                </EpistoFont>

                {/* rating buttons  */}
                <RatingStars
                    selectedIndex={difficultyRating}
                    setSelectedIndex={handleRateVideoDifficultyAsync}
                    iconUrl={getAssetUrl('images/difficulty3D.png')} />
            </Flex>}
        </Flex>
    );
};