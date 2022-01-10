import { Box } from "@chakra-ui/layout";
import React from "react";
import { Radar } from "react-chartjs-2";
import { PersonalityDataDTO } from "../../models/shared_models/PersonalityDataDTO";

export const PersonalityChart = (props: { data: PersonalityDataDTO | null }) => {

    const personalityData = props.data;

    const splitKeysByCharCount = (keys: string[], maxChar: number) => {
        return keys.map(k => {
            let sections: string[] = [];
            let words = k.split(" ");
            let temp = "";

            words.forEach(function (item, index) {
                if (temp.length > 0) {
                    var concat = temp + ' ' + item;

                    if (concat.length > maxChar) {
                        sections.push(temp);
                        temp = "";
                    } else {
                        if (index === (words.length - 1)) {
                            sections.push(concat);
                            return;
                        } else {
                            temp = concat;
                            return;
                        }
                    }
                }

                if (index === (words.length - 1)) {
                    sections.push(item);
                    return;
                }

                if (item.length < maxChar) {
                    temp = item;
                } else {
                    sections.push(item);
                }

            });

            return sections as string[];
        })
    }

    if (!personalityData)
        return <Box></Box>

    const keys = personalityData
        ?.traits
        ?.map(x => x.traitName) ?? [];

    const values = personalityData
        ?.traits
        ?.map(x => x.traitScore) ?? [];

    const dummyAverageValues = [4, 3, 4, 2, 3, 3, 4, 3, 5, 4]

    const sets = [
        {
            label: 'Saját analízisem',
            fill: true,
            backgroundColor: '#97c9cc60',
            borderColor: '#97c9cc',
            pointBackgroundColor: '#97c9cc',
            pointBorderColor: '#97c9cc',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#97c9cc',
            data: values
        },
        {
            label: 'Céges átlag',
            fill: true,
            backgroundColor: 'rgba(229,168,111,0.59)',
            borderColor: '#fda23e',
            pointBackgroundColor: '#ccb797',
            pointBorderColor: '#ccb797',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#97c9cc',
            data: dummyAverageValues
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
                },
            }
        }}
        data={{
            labels: splitKeysByCharCount(keys, 20),
            datasets: sets
        }}
        style={{
            height: 400
        }} />
}
