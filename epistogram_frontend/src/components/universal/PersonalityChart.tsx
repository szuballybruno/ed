import React from "react";
import { Radar } from "react-chartjs-2";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { usePersonalityData } from "../../services/dataService";

export const PersonalityChart = () => {

    const {
        personalityData,
        personalityDataError,
        personalityDataState
    } = usePersonalityData();

    console.log(personalityData);

    const keys = personalityData
        ?.traits
        ?.map(x => x.traitName) ?? [];

    const values = personalityData
        ?.traits
        ?.map(x => x.traitScore) ?? [];

    const sets = [
        {
            label: 'Szemelyes preferencia',
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

    return <LoadingFrame
        loadingState={personalityDataState}
        error={personalityDataError}>
        <Radar
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
    </LoadingFrame>
}