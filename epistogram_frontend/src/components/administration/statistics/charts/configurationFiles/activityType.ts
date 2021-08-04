import classes from "../../statistics.module.scss";

const data = {
    chart: {
        showpercentvalues: "1",
        defaultcenterlabel: "",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        decimals: "0",
        plottooltext:
            "A felhasználók <b>$percentValue</b>-a <b>$label</b>",
        centerlabel: "",
        theme: "fusion",
        bgColor: "#9FF9FC",
        bgAlpha: '0',
        showBorder: false,
        valueFontColor: "#000000",
        pieRadius: 80,
        radius3d: 100,
        showPlotBorder: false,
        showShadow: false,
        baseFontSize: 14,
        renderAt: classes.activityPieChartWrapper
    },
    data: [
        {
            label: "Videót néz",
            value: "46"
        },
        {
            label: "Tesztet tölt ki",
            value: "25"
        },
        {
            label: "Nincs aktivitás",
            value: "86"
        }
    ]
};

export default data