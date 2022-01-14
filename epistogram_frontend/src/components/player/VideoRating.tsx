import { Flex } from "@chakra-ui/react"
import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useRateVideoDifficulty, useRateVideoExperience, useVideoRating } from "../../services/api/videoRatingApiService"
import { useShowErrorDialog } from "../../services/core/notifications"
import { getAssetUrl, iterate } from "../../static/frontendHelpers"
import { EpistoButton } from "../universal/EpistoButton"

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
    }

    const handleRateVideoDifficultyAsync = async (rating: number) => {

        try {

            await rateVideoDifficultyAsync({ videoId, difficulty: rating });
            await refetchVideoRating();
            setShowDificultyRating(false);
        }
        catch (e) {

            showError(e);
        }
    }

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
                <Typography
                    variant="overline">

                    Mennyire volt hasznos ez a videó?
                </Typography>

                {/* rating buttons  */}
                <Flex>
                    {iterate(5, (index) => (
                        <EpistoButton
                            onClick={() => handleRateVideoExperienceAsync(index + 1)}
                            style={{
                                // marginRight: "5px"
                            }}>

                            <img
                                src={getAssetUrl("images/star3D.png")}
                                alt=""
                                className="square25"
                                style={{
                                    objectFit: "contain",
                                    filter: experienceRating && (experienceRating >= index + 1)
                                        ? undefined
                                        : "saturate(0) opacity(0.5)"
                                }} />
                        </EpistoButton>
                    ))}
                </Flex>
            </Flex>}

            {/* difficulty rating */}
            {showDificultyRating && <Flex
                mx="10px"
                direction="column"
                align="flex-end">

                {/* title */}
                <Typography
                    variant="overline">

                    Ennyire volt nehéz megérteni
                </Typography>

                {/* rating buttons  */}
                <Flex>

                    {iterate(5, (index) => (
                        <EpistoButton
                            onClick={() => handleRateVideoDifficultyAsync(index + 1)}
                            style={{
                                // marginRight: "5px"
                            }}>

                            <img
                                src={getAssetUrl("images/difficulty3D.png")}
                                alt=""
                                className="square25"
                                style={{
                                    objectFit: "contain",
                                    filter: difficultyRating && (difficultyRating >= index + 1)
                                        ? undefined
                                        : "saturate(0) opacity(0.5)"
                                }} />
                        </EpistoButton>
                    ))}
                </Flex>
            </Flex>}
        </Flex>
    )
}