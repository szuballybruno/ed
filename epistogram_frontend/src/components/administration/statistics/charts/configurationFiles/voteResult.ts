const data = {
    type: "pie2d", // The chart type
    width: "100%", // Width of the chart
    height: "380", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
        // Chart Configuration
        chart: {
            xAxisName: "Country",
            yAxisName: "Reserves (MMbbl)",
            numberSuffix: "K",
            theme: "fusion",
            bgAlpha: "0",
            valueFontColor: "#FFFFFF",
            showShadow: false,
            use3dLightning: false
        },
        // Chart Data
        data: [
            {
                label: `${"Okosotthon"}`,
                value: `${23}`
            },
            {
                label: `${"Kommunikáció"}`,
                value: `${64}`
            }
        ]
    }
};

export default data