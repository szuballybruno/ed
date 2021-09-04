import {Radar} from "react-chartjs-2";
import React from "react";
import classes from "./learningRadarChart.module.scss"
import {Typography} from "@material-ui/core";

export const LearningRadarChart = () => {
    return <div className={classes.chartWrapper}>
        <div className={classes.leftWrapper}>
            <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vesapihi bemamafele be, rebet fe lebaf byleh balesi mula fadaqu, boecydaseb li lija. .<br />
                <br />
                Hemyleli sa le, ve belemo, baf byfimahe tycuv, fil romis fadic do mim, bedam, sibul. Dibe, pari soele le lipefafovoe nasem bitela pojevibaju, voemehevun caquoqu le didad. Lelif boebe fol temij cil, ma pan myquif, vavi tibeh fyc rymido pa. <br />
                <br />
                Lej, fob lemi je boe fad badoeroeli, jipyd le rab da quej hecolisoe lalinitef. <br />
                Bidah, fol, boe cifohi jobycu vym didipidy, vibe babalaf, lebabibeh, ba poto diru ra. <br />
                Jal sar, mefo boefa jenyr ditoe da lenoequ remoe julomufu. Dyme, lehilile, jalibi lehil fefoem tece ta tele lidat daraly, daf fatifac feli dalero. <br />
            </Typography>
        </div>
        <div className={classes.rightWrapper}>
            <Radar options={{
                responsive: true,
                maintainAspectRatio: false,
            }} data={{
                labels: ["Január", "Február", "Március", "Április", "Május", "Június"],
                datasets: [
                    {
                        label: 'Unfilled',
                        fill: true,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(54, 162, 235)',
                        data: [57,26,31,12,34, 83],
                    }, {
                        label: 'Dashed',
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        data: [5, 59, 72, 32, 19, 23],

                    }
                ]
            }} /*type={"radar"}*//>
        </div>

    </div>
}