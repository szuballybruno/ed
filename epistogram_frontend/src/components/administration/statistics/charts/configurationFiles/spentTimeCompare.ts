const data= {
    chart: {
        caption: "",
        subCaption: "",
        theme: "hulk-light",
        showValues: "0",
        bgAlpha: '0',
        canvasBgAlpha: '20',
        plottooltext: "<b>Year : $seriesName</b>{br}Month: $label{br}Temp: $dataValue &deg;C</div>",
        showBorder: false,
        showCanvasBorder: false,
        showPlotBorder: false,
        plotBorderAlpha: '0',
        usePlotGradientColor: false,
    },
    categories: [{
        category: [{
            label: "Hétfő"
        }, {
            label: "Kedd"
        }, {
            label: "Szerda"
        }, {
            label: "Csütörtök"
        }, {
            label: "Péntek"
        }, {
            label: "Szombat"
        }, {
            label: "Vasárnap"
        }]
    }],
    dataset: [{
        seriesname: "Múlt hét",
        data: [{
            value: "5"
        }, {
            value: "12"
        }, {
            value: "19"
        }, {
            value: "22"
        }, {
            value: "19"
        }, {
            value: "24"
        }, {
            value: "22"
        }, {
            value: "24"
        }, {
            value: "18"
        }, {
            value: "14"
        }, {
            value: "10"
        }, {
            value: "7"
        }]
    }, {
        seriesname: "Ez a hét",
        data: [{
            value: "9"
        }, {
            value: "12"
        }, {
            value: "21"
        }, {
            value: "20"
        }, {
            value: "19"
        }, {
            value: "23"
        }, {
            value: "23"
        }, {
            value: "25"
        }, {
            value: "17"
        }, {
            value: "10"
        }, {
            value: "11"
        }, {
            value: "4"
        }]
    }]
}

export default data