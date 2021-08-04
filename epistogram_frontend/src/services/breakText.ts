export const breakText = (inputText: string) => {
    try {
        const text = inputText.split("<br />");
        return text.map((textike, index) => {
            return {
                key: index,
                text: text[index]
            }
        });
    } catch {
        return null;
    }
}
