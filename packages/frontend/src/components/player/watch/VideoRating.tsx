import { useEffect, useState } from 'react';
import { useRateVideoDifficulty, useRateVideoExperience, useVideoRating } from '../../../services/api/videoRatingApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { Id } from '@episto/commontypes';
import { Environment } from '../../../static/Environemnt';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { RatingStars } from '../../universal/RatingStars';

export const VideoRating = (props: { videoVersionId: Id<'VideoVersion'> }) => {

    const { videoVersionId } = props;

    // http
    const { videoRating, refetchVideoRating } = useVideoRating(videoVersionId);
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

            await rateVideoExperienceAsync({ videoVersionId, experience: rating });
            await refetchVideoRating();
            setShowDificultyRating(true);
        }
        catch (e) {

            showError(e);
        }
    };

    const handleRateVideoDifficultyAsync = async (rating: number) => {

        try {

            await rateVideoDifficultyAsync({ videoVersionId, difficulty: rating });
            await refetchVideoRating();
            setShowDificultyRating(false);
        }
        catch (e) {

            showError(e);
        }
    };

    useEffect(() => {

        setShowDificultyRating(false);
    }, [videoVersionId]);

    useEffect(() => {

        setDifficultyRating(videoRating?.difficulty ?? null);
        setExperienceRating(videoRating?.experience ?? null);
    }, [videoRating]);

    return (
        <EpistoFlex2 direction="column">

            {/* experience rating */}
            {!showDificultyRating && <EpistoFlex2
                mx="10px"
                direction="column"
                align="flex-end">

                {/* title */}
                <EpistoFont
                    fontSize="fontSmall"
                    isUppercase>

                    {translatableTexts.player.videoRating.experienceRating}
                </EpistoFont>

                {/* rating buttons  */}
                <RatingStars
                    setSelectedIndex={handleRateVideoExperienceAsync}
                    selectedIndex={experienceRating} />
            </EpistoFlex2>}

            {/* difficulty rating */}
            {showDificultyRating && <EpistoFlex2
                mx="10px"
                direction="column"
                align="flex-end">

                {/* title */}
                <EpistoFont
                    fontSize="fontSmall"
                    isUppercase>

                    {translatableTexts.player.videoRating.difficultyRating}
                </EpistoFont>

                {/* rating buttons  */}
                <RatingStars
                    selectedIndex={difficultyRating}
                    setSelectedIndex={handleRateVideoDifficultyAsync}
                    iconUrl={Environment.getAssetUrl('images/difficulty3D.png')} />
            </EpistoFlex2>}
        </EpistoFlex2>
    );
};