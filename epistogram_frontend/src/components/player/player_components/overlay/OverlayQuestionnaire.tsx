import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { QuestionDTO } from '../../../../models/shared_models/QuestionDTO';

export const OverlayQuestionnaire = (props: {
    videoProgressSeconds: number,
    videoLengthSeconds: number,
    questions: QuestionDTO[]
}) => {

    return <Box>
        <NmiOne />,
        <NmiTwo />
    </Box>
};

// updateActivity(
//     "",
//     "openNMI",
//     window.location.href as string,
//     "Overlay-useEffect",
//     "useEffect",
//     "collBasedActive",
//     "NMI megnyitva",
//     false,
//     undefined,
//     undefined,
//     "videos",
//     "_id",
//     user.userData.currentItem._id.get(), undefined, undefined)