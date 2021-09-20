import { Line } from "react-chartjs-2";

export const DevelopmentLineChart = (props: { data: any }) => {

    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return <Line
        options={options}
        /*type={"line"}*/
        data={props.data} />
}