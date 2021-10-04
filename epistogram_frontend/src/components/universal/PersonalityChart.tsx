import { Box } from "@chakra-ui/layout";
import React from "react";
import { Radar } from "react-chartjs-2";
import { PersonalityDataDTO } from "../../models/shared_models/PersonalityDataDTO";

export const PersonalityChart = (props: { data: PersonalityDataDTO | null }) => {

    const personalityData = props.data;

    if (!personalityData)
        return <Box></Box>

    const keys = personalityData
        ?.traits
        ?.map(x => x.traitName) ?? [];

    const values = personalityData
        ?.traits
        ?.map(x => x.traitScore) ?? [];

    const sets = [
        {
            label: 'Személyes preferenciám',
            fill: true,
            backgroundColor: '#ff810099',
            borderColor: '#ff8100',
            pointBackgroundColor: '#ff8100',
            pointBorderColor: '#ff8100',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff8100',
            data: values
        }
    ];

    return <Radar
        options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 7
                }
            }
        }}
        data={{
            labels: keys,
            datasets: sets
        }} />
}