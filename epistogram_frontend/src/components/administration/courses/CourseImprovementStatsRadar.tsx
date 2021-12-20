import { Radar } from "react-chartjs-2"
import { CourseImprovementStatDTO } from "../../../models/shared_models/CourseImprovementStatDTO"

export const CourseImprovementStatsRadar = (props: { stats: CourseImprovementStatDTO[] }) => {

    const { stats } = props;

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
                    suggestedMax: 10
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: "Mit fejleszt a tanfolyam?"
                },
                legend: {
                    display: false
                }
            },
        }}
        data={{
            labels: stats.map(x => x.text),
            datasets: [
                {
                    data: stats.map(x => x.value),
                    backgroundColor: ["rgba(125,232,178,0.46)", "rgba(125,232,178,0.46)", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"]
                }
            ]
        }} />
}