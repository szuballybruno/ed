import colors from '../configuration/colors.json';

const setTheme = (theme: string) => {
    const setProperty = (propertyName: string, propertyValue: string) => {
        document.documentElement.style.setProperty(propertyName, propertyValue);
    }
    const parsedColors = JSON.parse(JSON.stringify(colors))

    const colorKeys: [string, string][]= Object.entries(parsedColors[theme])

    colorKeys.map(([propertyName, propertyValue]) => {
        return setProperty(propertyName, propertyValue);
    })
}

export default setTheme
